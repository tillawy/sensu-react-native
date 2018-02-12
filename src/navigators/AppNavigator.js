
/*
https://github.com/react-community/react-navigation/blob/master/examples/ReduxExample/src/navigators/AppNavigator.js
 */

import React from 'react';
import { Platform } from 'react-native';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';


import LoginScreen from '../components/login_form';
import IntroScreen from '../components/intro_screen'
import EventsListScreen from '../components/events_list_screen';
import EventDetailScreen  from '../components/event_screen';


export const AppNavigator = StackNavigator({
    Intro: { screen: IntroScreen},
    Auth: { screen: LoginScreen },
    EventsList: { screen: EventsListScreen },
    Event: { screen: EventDetailScreen }
}, {
    navigationOptions: {
        title: "{this.props}",
        headerStyle: {
            backgroundColor: '#2196f3',
            // marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight
        },
        headerTintColor: '#fff'
    }
});


import { addListener } from '../utils/redux';



class AppWithNavigationState extends React.Component {
    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      nav: PropTypes.object.isRequired,
    };
  
    render() {
      const { dispatch, nav, auth } = this.props;
      return (
        <AppNavigator
          screenProps={{"auth" : auth}}
          navigation={addNavigationHelpers({
            dispatch,
            state: nav,
            addListener,
          })}
        />
      );
    }
};

const mapStateToProps = state => ({
    nav: state.nav,
    auth: state.auth
});

export default connect(mapStateToProps)(AppWithNavigationState);
