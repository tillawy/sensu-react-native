import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionAuth, actionCheckSavedTokens } from '../actions/auth_actions'
import { Card, CardSection, Button as AppButton, NavBarButton } from './common'
import { actionNavigateToEventsList, actionNavigateToLogin } from '../actions/nav_actions'
import { Alert } from "react-native";


class IntroScreen extends Component {

    
    static navigationOptions = ({ navigation, screenProps }) => {
        const action = !screenProps.auth.accessToken ? "Login" : "Logout";
        return {
            title: 'Welcome',
            headerRight: <NavBarButton onPress={() => navigation.navigate(`Navigate/${action}`)}>{action}</NavBarButton>,
        }
    }

    componentDidMount(){
        console.log("IntroScreen componentDidMount");
        // this.props.actionCheckSavedTokens();
    }

    navigateToEventsList(){
        if (!this.props.accessToken){
            // Works on both iOS and Android
            Alert.alert(
                'Login Required',
                'Please login first',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => this.props.actionNavigateToLogin()},
                ]
            );
            return;
        }
        this.props.actionNavigateToEventsList();
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <AppButton onPress={this.navigateToEventsList.bind(this)}>
                        Appointments
                    </AppButton>
                </CardSection>
            </Card>
        );
    };
};



function mapStateToProps(state) {
    console.log("IntroScreen mapStateToProps:",state.auth);

    return {
        /*uid: state.auth.uid,
        client: state.auth.client,
        accessToken: state.auth.accessToken,
        availableAuthAction: state.auth.availableAuthAction,
        */
    };

}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
     actionAuth , actionNavigateToLogin,actionNavigateToEventsList , actionCheckSavedTokens 
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(IntroScreen);

