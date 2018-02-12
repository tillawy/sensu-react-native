import React from 'react';

import { Provider } from 'react-redux';

import reducers from './reducers';

import { createStore, applyMiddleware , compose } from 'redux'

import thunk from 'redux-thunk';

import Sentry from 'sentry-expo';

Sentry.enableInExpoDevelopment = true;

// import { SentrySeverity, SentryLog } from 'react-native-sentry';
Sentry.config('https://b4a3db5be93648839c945e525c1daa4d:81600547059c4de2a9efe126802aa504@sentry.io/286241').install();


import Reactotron, {
    trackGlobalErrors,
    openInEditor,
    overlay,
    asyncStorage,
    networking
} from 'reactotron-react-native'

import { reactotronRedux } from 'reactotron-redux'



Reactotron
    .configure({
        name: 'React Native Demo'
    })
    .useReactNative() // add all built-in react native plugins
    .use(trackGlobalErrors())
    .use(openInEditor())
    .use(overlay())
    .use(asyncStorage())
    .use(networking())
    .use(reactotronRedux())
    .connect();



const store = Reactotron.createStore(
    reducers,
    compose(applyMiddleware(thunk))
);


import AppWithNavigationState from './navigators/AppNavigator';

export default class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}
