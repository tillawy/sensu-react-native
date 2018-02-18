
import axios from 'axios';
import { AsyncStorage } from 'react-native';

import {

    ACTION_EVENT_DETAILS,

    ACTION_EVENTS_LIST_REQUEST,
    ACTION_EVENTS_LIST_REQUEST_SUCCESS,
    ACTION_EVENTS_LIST_REQUEST_FAILURE

} from './types';


import {
    KEY_HOST
} from '../constants';


export const actionEventDetails = (event) => {
    return({
        type: ACTION_EVENT_DETAILS,
        payload: event
    });
};


const apiHost = async () => {
    const host = await AsyncStorage.getItem(KEY_HOST);
    return host;
};


export const actionListEvents = () => {
    
    console.log( `EventsActions actionListEvents`);

    return (dispatch) => {
        return apiHost().then((host) => {
            const url = `${host}/events`;
            return axios.get( url ,  { params: {} } ).then((response) => {
                dispatch({
                    type: ACTION_EVENTS_LIST_REQUEST_SUCCESS,
                    payload: response
                });
            }).catch((error) => {
                console.warn(error);
                dispatch({
                    type: ACTION_EVENTS_LIST_REQUEST_FAILURE,
                    payload: error
                });
                throw error;
            });
        });

        dispatch({type: ACTION_EVENTS_LIST_REQUEST})
    };

};

