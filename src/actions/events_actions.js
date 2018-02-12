

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

/*
export const actionUpdateAppointment = (id, dict ) => {
    return (dispatch) => {
        const url = `${API_HOST}/api/appointments/${id}`;
        console.log( `actionUpdateAppointment id:${id}, url: ${url}`, dict);
        return axios.request( url ,
            {
                method: 'patch',
                data: dict
            }
        ).then(function (response) {
            // console.log(response);
            dispatch({
                type: ACTION_EVENT_UPDATE_REQUEST_SUCCESS,
                payload: response
            });



        }).catch(function (error) {
                console.warn(error);
                dispatch({
                    type: ACTION_EVENT_UPDATE_REQUEST_FAILURE,
                    payload: error
                });
                throw error;
            });
        dispatch({type: ACTION_EVENT_UPDATE_REQUEST})
    };
};

export const actionAppointmentDetail = (id ) => {
    console.log( `actionAppointmentDetail:( id:${id}  )`)
    return (dispatch) => {
        const url = `${API_HOST}/api/appointments/${id}`;
        console.log( `actionAppointmentDetail url: ${url}`);
        return axios.get( url ,
            {
                params: {}
            }
        ).then(function (response) {
                // console.log(response);
                dispatch({
                    type: ACTION_EVENT_DETAIL_REQUEST_SUCCESS,
                    payload: response
                });
            })
            .catch(function (error) {
                console.warn(error);
                dispatch({
                    type: ACTION_EVENT_DETAIL_REQUEST_FAILURE,
                    payload: error
                });
                throw error;
            });
        dispatch({type: ACTION_EVENT_DETAIL_REQUEST})
    };
};


export const actionListAppointments = (month ) => {
    
    console.log( `AppointmentsActions actionListAppointments:( month:${month} )`);
    const url = `${API_HOST}/api/appointments?days=10`;
    return (dispatch) => {
        return Api.get(url).then((response) => {
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
        dispatch({type: ACTION_EVENT_DETAIL_REQUEST})
    };

};

*/