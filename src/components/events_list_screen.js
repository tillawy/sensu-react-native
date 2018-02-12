import React, { Component } from 'react';
import { ListView, RefreshControl , Button,Alert } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './list_item';
import { bindActionCreators } from 'redux';
import { actionListAppointments } from '../actions/events_actions';

import { HeaderBackButton,HeaderBackArrow } from 'react-navigation';
import { Platform } from 'react-native';

class EventsList extends Component {


    static navigationOptions = ({navigation}) => {
        return {
            title: 'Future Appointments'
        }
    };


    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }

    _onRefresh() {
        this.setState({refreshing: true});

        const currentMonth = new Date().getMonth()+1;
        this.props.actionListAppointments(currentMonth).then(() => {
                this.setState({refreshing: false});
        }).catch((err) => {
            Alert.alert( 'Error',  err.message,  [ {text: 'OK', onPress: () => console.log('OK Pressed')}, ] )
        });

    }


    componentDidMount(){
        // console.log("componentDidMount");
        const currentMonth = new Date().getMonth()+1;
        this.props.actionListAppointments(currentMonth).then(() => {
            console.log("actionListAppointments then");
        }).catch((err) => {
            Alert.alert( 'Error',  err.message,  [ {text: 'OK', onPress: () => console.log('OK Pressed')}, ] )
        });
    };


    renderRow(appointment) {
        return <ListItem appointment={appointment}/>;
    };


    render() {
        return (
            <ListView
                dataSource={this.props.dataSource}
                renderRow={this.renderRow}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
            />
        );
    };

}



const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});



function mapStateToProps(state) {
    // console.log( ` ••••••••• EventsList mapStateToProps state.appointments:`, state.appointments.entries);

    return {
        appointments: state.appointments.entries,
        dataSource: dataSource.cloneWithRows(state.appointments.entries)
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ actionListAppointments }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(EventsList);

