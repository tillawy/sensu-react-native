import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionAuth, actionCheckSavedTokens } from '../actions/auth_actions'
import { Card, CardSection, Button as AppButton, NavBarButton } from './common'
import { actionNavigateToEventsList, actionNavigateToLogin } from '../actions/nav_actions'
import { Alert, View , Image} from "react-native";


class IntroScreen extends Component {

    
    static navigationOptions = ({ navigation, screenProps }) => {
        const action = !screenProps.auth.authToken ? "Login" : "Logout";
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
        if (!this.props.authToken){
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
                    <View style={styles.thumbnailContainerStyle}>
                        <Image style={styles.thumbnailStyle}
                               source={require('../../img/sensu.png')}
                        />
                    </View>
                </CardSection>

                <CardSection>
                    <AppButton onPress={this.navigateToEventsList.bind(this)}>
                        Events
                    </AppButton>
                </CardSection>
            </Card>
        );
    };
};



const styles = {

    thumbnailStyle: {
        height: 50,
        width: 50
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },

};


function mapStateToProps(state) {
    console.log("IntroScreen mapStateToProps:",state.auth);
    return {
        authToken: state.auth.authToken,
        xsrf: state.auth.xsrf
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
     actionAuth , actionNavigateToLogin,actionNavigateToEventsList , actionCheckSavedTokens 
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(IntroScreen);

