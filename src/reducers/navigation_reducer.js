

import {
    ACTION_LOGOUT,
    ACTION_BACK,
    ACTION_AUTH_REQUEST_SUCCESS,
    ACTION_EVENT_DETAIL_REQUEST_SUCCESS,
    ACTION_EVENT_DETAILS,
    ACTION_NAVIGATE_TO_EVENTS_LIST
} from '../actions/types';


import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigators/AppNavigator';



const introAction = AppNavigator.router.getActionForPathAndParams('Intro',{title: 'WHATEVER'});
const stateForIntroAction = AppNavigator.router.getStateForAction( introAction );

export default (state = stateForIntroAction, action) => {

    console.log( 'reducer nav action:', action.type );
    let nextState;
    switch (action.routeName) {
        case "Navigate/Login":{
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Auth' }),
                state
            );
            break;
        }
        case "Navigate/Logout":{

            break;
        }
    }
    switch (action.type) {

        case  ACTION_EVENT_DETAILS:
            console.log("ACTION_EVENT_DETAILS !!!");
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Event' }),
                state
            );
            break;


        case ACTION_NAVIGATE_TO_EVENTS_LIST:
            console.log("ACTION_NAVIGATE_TO_EVENTS_LIST !!!");
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'EventsList' }),
                state
            );
            break;
/*
        case ACTION_EVENT_UPDATE_REQUEST_SUCCESS:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );
            break;
*/
        case ACTION_AUTH_REQUEST_SUCCESS:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );
            break;
        case ACTION_EVENT_DETAIL_REQUEST_SUCCESS:
            // const acccc = AppNavigator.router.getActionForPathAndParams('Main');
            // const accccState = AppNavigator.router.getStateForAction(acccc);
            console.log("ACTION_EVENT_DETAIL_REQUEST_SUCCESS !!!");
            // console.log( action.payload.data );

            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'Event'}, {event: action.payload.data}),
                state
            );
            break;

        case ACTION_BACK:
            console.log("ACTION_BACK !!!");
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );
            break;
        case ACTION_LOGOUT:
            // const acccc = AppNavigator.router.getActionForPathAndParams('Main');
            // const accccState = AppNavigator.router.getStateForAction(acccc);
            console.log("ACTION_LOGOUT !!!");
            /*nextState = AppNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );
            break;
            */
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}
