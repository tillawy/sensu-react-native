

import {
    ACTION_EVENTS_LIST_REQUEST_SUCCESS,
    ACTION_EVENT_DETAILS
} from '../actions/types';

const INITIAL_STATE = {entries:[],selected: null};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTION_EVENT_DETAILS: {
            console.log("AppointmentsReducer ACTION_EVENT_DETAILS !!!");
            return { ...state, selected: action.payload };
        }
        case ACTION_EVENTS_LIST_REQUEST_SUCCESS :{
            console.log("AppointmentsReducer ACTION_EVENTS_LIST_REQUEST_SUCCESS !!!");
            return { ...state, entries: action.payload.data };
        }
        /*case ACTION_EVENT_DETAIL_REQUEST_SUCCESS:{
            console.log("AppointmentsReducer ACTION_EVENT_DETAIL_REQUEST_SUCCESS !!!");
            return { ...state, selected: action.payload.data };
        }*/
        default:{
            return state;
        }
    }
};