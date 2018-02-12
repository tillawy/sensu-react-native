

import {
    ACTION_NAVIGATE_TO_EVENTS_LIST,
    ACTION_NAVIGATE_TO_INTRO,
    ACTION_NAVIGATE_TO_LOGIN
} from './types';


export const actionNavigateToLogin = () => {
    console.log( `nav_actions:actionOpenEventsList()`);
    return ({ type: ACTION_NAVIGATE_TO_LOGIN, routeName: 'Navigate/Login' , payload: {}});
};



export const actionNavigateToEventsList = () => {
    console.log( `nav_actions:actionOpenEventsList()`);
    return ({type: ACTION_NAVIGATE_TO_EVENTS_LIST , payload: {}});
};


export const actionNavigateToIntro = () => {
    console.log( `nav_actions:actionNavigateToIntro()`);
    return ({type: ACTION_NAVIGATE_TO_INTRO , payload: {}});
};



