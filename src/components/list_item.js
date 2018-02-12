import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Text, TouchableWithoutFeedback, View } from 'react-native';

import { CardSection } from './common';
import { actionAppointmentDetail } from '../actions/events_actions';


class ListItem extends Component {
    onRowPress() {
        this.props.actionAppointmentDetail(this.props.appointment.id, this.props.uid, this.props.client ,this.props.accessToken, (appointment)=>{
            console.log( "done actionAppointmentDetail ", appointment );
        });
    }

    render() {
        const { id, start_datetime, end_datetime, status } = this.props.appointment;

        const statuses = [ "Canceled", "Pending","Confirmed", "Done", "Missed" ];

        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View style={styles.containersStyle}>

                    <Text style={styles.titleStyle}>
                        id: {id}
                    </Text>

                    <Text style={styles.titleStyle}>
                        status: {statuses[status]}
                    </Text>

                    <Text style={styles.titleStyle}>
                        Day: {new Date(start_datetime).toDateString()}
                    </Text>

                    <Text style={styles.titleStyle}>
                        from: {new Date(start_datetime).toLocaleTimeString("en-US", {timeZone: "Asia/Riyadh"})}
                    </Text>

                    <Text style={styles.titleStyle}>
                        to: {new Date(end_datetime).toLocaleTimeString("en-US", {timeZone: "Asia/Riyadh"})}
                    </Text>

                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15,
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    containersStyle:{
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        borderColor: '#ddd'
    }
};



const mapStateToProps = ({ auth }) => {
    const { uid, client, accessToken} = auth;
    return { uid, client, accessToken };
};


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ actionAppointmentDetail }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ListItem);



