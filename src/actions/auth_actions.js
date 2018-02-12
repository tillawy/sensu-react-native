
import axios from 'axios';
import { AsyncStorage } from 'react-native';

import {
    ACTION_AUTH_REQUEST,
    ACTION_AUTH_REQUEST_FAILURE,
    ACTION_AUTH_REQUEST_SUCCESS,
    ACTION_LOGOUT
} from './types';


import {
    API_HOST,
    KEY_AUTH_TOKEN,
    KEY_XSRF_TOKEN,
    KEY_USERNAME,
    KEY_PASSWORD
} from '../constants';




export const actionCheckSavedTokens = () => {
    console.log("AuthActions actionCheckSavedTokens");
    
    return (dispatch) => {
        const asyncGetAccessKeys = async () => {
            try {
                const accessToken = await AsyncStorage.getItem(KEY_ACCESSTOKEN);
                const uid = await AsyncStorage.getItem(KEY_UID);
                const client = await AsyncStorage.getItem(KEY_CLIENT);

                if (!accessToken || !uid || !client){
                    return;
                }

                setAxiosDefaultHeader(accessToken, client,uid);

                dispatch({
                    type: ACTION_AUTH_REQUEST_SUCCESS,
                    payload: {uid: uid, accessToken: accessToken, client: client}
                });
            } catch (error) {
                console.warn(error.message);
                this._appendMessage('AsyncStorage error: ' + error.message);
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


export const actionLogin = (username, password) => {
    // debugger
    console.log( `login_actions:actionLogin( ${username}:${password} )`)
    return (dispatch) => {
        dispatch({type: ACTION_AUTH_REQUEST});
        return axios.post(`${API_HOST}/login`, { user: username,  pass: password })
            .then(function (response) {
                console.log("AuthActions actionLogin: ",response.headers);

                let xsrf;
                let authToken;

                const asyncSaveAccessKeys = async () => {
                    try {
                        xsrf = response.headers['uid'];
                        authToken = response.headers['client'];
                        

                        await AsyncStorage.setItem(KEY_ACCESSTOKEN , accessToken);
                        await AsyncStorage.setItem(KEY_UID , uid);
                        await AsyncStorage.setItem(KEY_CLIENT , client);

                    } catch (error) {
                        console.warn(error);
                        this._appendMessage('AsyncStorage error: ' + error.message);
                    }
                };

                asyncSaveAccessKeys().then( () => {

                    setAxiosDefaultHeader(accessToken, client,uid);

                    dispatch({
                        type: ACTION_AUTH_REQUEST_SUCCESS,
                        payload: {uid: uid, accessToken: accessToken, client: client}
                    });
                });


            })
            .catch(function (error) {
                console.warn(error);
                dispatch({
                    type: ACTION_AUTH_REQUEST_FAILURE,
                    payload: error
                })
            });

    };
};
