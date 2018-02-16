

import axios from 'axios';


import {

    ACTION_EVENT_DETAIL_REQUEST,
    ACTION_EVENT_DETAIL_REQUEST_SUCCESS,
    ACTION_EVENT_DETAIL_REQUEST_FAILURE,

    ACTION_EVENTS_LIST_REQUEST,
    ACTION_EVENTS_LIST_REQUEST_SUCCESS,
    ACTION_EVENTS_LIST_REQUEST_FAILURE

} from './types';


import {
    API_HOST
} from '../constants';


export const actionListEvents = () => {
    
    console.log( `EventsActions actionListEvents`);
    const url = `${API_HOST}/events`;
    return (dispatch) => {
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
        dispatch({type: ACTION_EVENTS_LIST_REQUEST})
    };

};

