
import {AsyncStorage} from 'react-native';

import {
    ACTION_USERNAME_CHANGED,
    ACTION_PASSWORD_CHANGED,
    ACTION_AUTH_REQUEST,
    ACTION_AUTH_REQUEST_SUCCESS,
    ACTION_AUTH_REQUEST_FAILURE,
    ACTION_AUTH_SAVED_CREDENTIALS,
    ACTION_LOGOUT
} from '../actions/types';

const INITIAL_STATE = {
    password: '',
    username: '',
    error: '',
    loading: false,
    authToken: null,
    xsrf: null,
    availableAuthAction: 'Login'
};



import {
    KEY_CLIENT,
    KEY_ACCESSTOKEN,
    KEY_UID
} from '../constants';


export default (state = INITIAL_STATE, action) => {
    console.log('AuthReducer action:' , action.type);

    if ( action.type === "Navigation/NAVIGATE" &&  action.routeName === "Navigate/Logout") {
        const asyncSaveAccessKeys = async () => {
            try {
                await AsyncStorage.removeItem(KEY_ACCESSTOKEN);
                await AsyncStorage.removeItem(KEY_UID);
                await AsyncStorage.removeItem(KEY_CLIENT);
            } catch (error) {
                console.error(error);
                this._appendMessage('AsyncStorage error: ' + error.message);
            }
        };

        asyncSaveAccessKeys().done();

        return { ...state,
            loading: false,
            error: '' ,
            client: null,
            accessToken: null
        };

    }

    switch (action.type) {

        case ACTION_USERNAME_CHANGED :
            return { ...state, username: action.payload };
        case ACTION_PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case ACTION_AUTH_REQUEST:
            return { ...state, loading: true,  error: '' };
        /*case ACTION_LOGOUT:
            console.log('AuthReducer ACTION_LOGOUT !!!');
            return { ...state,
                loading: false,
                error: '' ,
                uid: null,
                client: null,
                accessToken: null
            };*/
        case ACTION_AUTH_REQUEST_SUCCESS:
            return { ...state, 
                username: action.payload.username, 
                password: action.payload.password,
                loading: false,
                xsrf:  action.payload.xsrf,
                authToken: action.payload.authToken,
                error: '' 
            };

        case ACTION_AUTH_REQUEST_FAILURE:
            return { ...state, error: 'Authentication Failed.', password: '', loading: false };
        case ACTION_AUTH_SAVED_CREDENTIALS:
            return { ...state, username: action.payload.username, password: action.payload.password };
        default:
            return state;
    }
};
