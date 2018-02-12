import { combineReducers } from 'redux';
import EventsReducer from './events_reducer';
import AuthReducer from './auth_reducer';
import NavReducer from './navigation_reducer';


export default combineReducers({
    nav: NavReducer ,
    appointments: EventsReducer,
    auth: AuthReducer
});