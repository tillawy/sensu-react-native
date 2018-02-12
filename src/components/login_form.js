


import React, { Component } from 'react';
import { Platform } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionLogin, actionUsernameChanged , actionPasswordChanged } from '../actions/auth_actions';


class LoginForm extends Component {

    
    componentDidMount(){
        console.log("LoginForm componentDidMount");
    };


    static navigationOptions = {
        title: 'Login'
    };

    onLoginFailure() {
        console.log("onLoginFailure()");

    }

    onLoginSuccess() {
        console.log("onLoginSuccess()");

    }

    renderButton() {
        console.log( `LoginForm renderButton() this.props.loading: ${this.props.loading}`);
        if (this.props.loading) {
            return <Spinner size="small" />
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Log in
            </Button>
        );
    }

    onButtonPress() {
        // this.setState({ error: '', loading: true });
        // const { email, password } = this.state;
        // console.log(`logging in using: email: ${this.props.email}, password: ${this.props.password}`);

        this.props.actionLogin(this.props.email,this.props.password,() => {
            console.log( `done LoginForm ` );
        });

    }


    render() {
        return (
            <Card >
                <CardSection>
                    <Input
                        label="Email:"
                        placeholder="name@email.com"
                        value={this.props.email}
                        onChangeText={this.props.actionUsernameChanged.bind(this)}
                        style={{ height: 20, width: 100 }}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Password:"
                        placeholder="password"
                        value={this.props.password}
                        secureTextEntry
                        onChangeText={this.props.actionPasswordChanged.bind(this)}
                        style={{ height: 20, width: 100 }}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>{this.props.error}</Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card >
        )
    };

}

const styles = StyleSheet.create({
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
});



// export default LoginForm;

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    return { email, password, error, loading };
};



function mapDispatchToProps(dispatch) {
    return bindActionCreators({ actionLogin,actionPasswordChanged, actionUsernameChanged }, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);


