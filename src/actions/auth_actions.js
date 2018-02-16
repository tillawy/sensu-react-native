
import axios from 'axios';
import { AsyncStorage } from 'react-native';

import {
    ACTION_AUTH_REQUEST,
    ACTION_USERNAME_CHANGED,
    ACTION_PASSWORD_CHANGED,
    ACTION_AUTH_REQUEST_FAILURE,
    ACTION_AUTH_REQUEST_SUCCESS,
    ACTION_AUTH_SAVED_CREDENTIALS,
    ACTION_AUTH_CREDENTIALS_AVAILBLE,
    ACTION_LOGOUT
} from './types';


import {
    API_HOST,
    KEY_USERNAME,
    KEY_PASSWORD
} from '../constants';




export const actionCheckSavedTokens = () => {
    console.log("AuthActions actionCheckSavedTokens");
    
    return (dispatch) => {
        const asyncGetAccessKeys = async () => {
            try {
                const username = await AsyncStorage.getItem(KEY_USERNAME);
                const password = await AsyncStorage.getItem(KEY_PASSWORD);
                console.log("AuthActions actionCheckSavedTokens ${username}:${password}");

                if (!username || !password){
                    return;
                }

                dispatch({
                    type: ACTION_AUTH_CREDENTIALS_AVAILBLE,
                    payload: {username: username, password: password }
                });
            } catch (error) {
                console.warn(error.message);
                // this._appendMessage('AsyncStorage error: ' + error.message);
            }
        };
        asyncGetAccessKeys().done();
    };

};


export const setAxiosDefaultHeader = (xsrf, authToken) => {

    axios.defaults.headers.common['X-XSRF-TOKEN'] = xsrf;
    axios.defaults.headers.common['Cookie'] = `AuthenticationToken=${authToken}`;

};


export const actionPasswordChanged = (text) => {
     return {
        type: ACTION_PASSWORD_CHANGED,
        payload: text
     };
};

export const actionUsernameChanged = (text) => {
    return {
        type: ACTION_USERNAME_CHANGED,
        payload: text
    };
};


export const actionLogin = (username, password, callback) => {
    // debugger
    console.log( `login_actions:actionLogin( ${username}:${password} )`)
    return (dispatch) => {
        dispatch({type: ACTION_AUTH_REQUEST});
        return axios.post(`${API_HOST}/login`, { user: username,  pass: password })
            .then(function (response) {
                // console.log("AuthActions actionLogin: ",response.headers);

                let xsrf;
                let authToken;

                authToken = response.headers['set-cookie'][0].split("=")[1].split(";")[0];
                xsrf = response.headers['set-cookie'][0].split("=")[3].split(";")[0];
                console.log(`AuthActions actionLogin ${xsrf}:${authToken}`);
                const asyncSaveAccessKeys = async () => {
                    try {
                        console.log(`AuthActions actionLogin ${KEY_USERNAME},${username}: ${KEY_PASSWORD},${password}`);
                        
                        await AsyncStorage.setItem( KEY_PASSWORD , password);
                        await AsyncStorage.setItem( KEY_USERNAME , username);
                        
                        console.log(`AuthActions actionLogin saved credentials`);
                    } catch (error) {
                        console.warn(error);
                        this._appendMessage('AsyncStorage error: ' + error.message);
                    }
                };

                asyncSaveAccessKeys().then( () => {

                    setAxiosDefaultHeader(xsrf, authToken);
                    
                    callback();

                    dispatch({
                        type: ACTION_AUTH_REQUEST_SUCCESS,
                        payload: {username: username, password: password, xsrf:xsrf, authToken:authToken}
                    });
                });


            }).catch(function (error) {
                console.warn(error);
                dispatch({
                    type: ACTION_AUTH_REQUEST_FAILURE,
                    payload: error
                })
            });

    };
};
