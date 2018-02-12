
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Text, View, Image, Linking } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';

import {actionUpdateAppointment,actionListAppointments} from '../actions/events_actions';

class AppointmentDetail extends Component {

    static navigationOptions = {
        title: 'Detail'
    };


    render() {

        const {
            id,
            start_datetime,
            end_datetime,
            status,
            user_id,
            user
        } = this.props.appointment;

        const {
            thumbnailStyle,
            headerContentStyles,
            thumbnailContainerStyle,
            headerTextStyle,
            imageStyle
        } = styles;


        const statuses = [ "Canceled", "Pending","Confirmed", "Done", "Missed" ];


        const reloadEventsList = () => {
            console.log("reloadEventsList ...");
            this.props.actionListAppointments(new Date().getMonth()+1 );
        };


        return (

            <Card>

                <CardSection>
                    <View style={thumbnailContainerStyle}>
                        <Image style={thumbnailStyle}
                               source={require('../../img/sensu.png')}
                        />
                    </View>
                    <View style={headerContentStyles}>
                        <Text style={headerTextStyle}>{user.id} {user.email}</Text>
                    </View>
                </CardSection>

                <CardSection>
                    <View style={headerContentStyles}>
                        <Text style={headerTextStyle}>
                        from: {new Date(start_datetime).toLocaleTimeString("en-US", {timeZone: "Asia/Riyadh"})}
                        </Text>
                    </View>
                </CardSection>

                <CardSection>
                    <View style={headerContentStyles}>
                        <Text style={headerTextStyle}>
                        to: {new Date(end_datetime).toLocaleTimeString("en-US", {timeZone: "Asia/Riyadh"})}
                        </Text>
                    </View>
                </CardSection>

                <CardSection>
                    <View style={headerContentStyles}>
                        <Text style={headerTextStyle}>
                        status: {statuses[status]}
                        </Text>
                    </View>
                </CardSection>


                <CardSection>
                    <Button onPress={() => Linking.openURL(`tel:${user.mobile_number_auxiliary}`)}>
                        Call: {user.mobile_number_auxiliary}
                    </Button>
                </CardSection>


                <CardSection>
                    <Button onPress={() =>  Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${user.address_latitude},${user.address_longitude}`)}>
                        Map
                    </Button>
                </CardSection>


                <CardSection>
                    <Button onPress={() => this.props.actionUpdateAppointment(this.props.appointment.id,{ done_at: null, confirmed_at: null, canceled_at: new Date()}).then( () =>  reloadEventsList() )}>
                        Cancel
                    </Button>
                </CardSection>


                <CardSection>
                    <Button onPress={() => this.props.actionUpdateAppointment(this.props.appointment.id,{ canceled_at: null, confirmed_at: new Date()}).then( () =>  reloadEventsList() )}>
                        Confirm
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={() => this.props.actionUpdateAppointment(this.props.appointment.id,{ canceled_at: null, done_at: new Date()}).then( () =>  reloadEventsList() )}>
                        Done
                    </Button>
                </CardSection>

            </Card>
        );
    }
};

const styles = {
    headerContentStyles: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 18,
    },
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
    imageStyle: {
        height: 300,
        flex: 1,
        width: null
    }

};



function mapStateToProps(state) {
    // console.log("AppointmentDetail mapStateToProps:",state.appointments.selected);
    return {
        appointment: state.appointments.selected
    };

}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ actionUpdateAppointment,actionListAppointments }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDetail);


