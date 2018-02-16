import React, { Component } from 'react';
import { ListView, RefreshControl , Button,Alert } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './list_item';
import { bindActionCreators } from 'redux';
import { actionListEvents } from '../actions/events_actions';

import { HeaderBackButton,HeaderBackArrow } from 'react-navigation';
import { Platform } from 'react-native';

class EventsList extends Component {


    static navigationOptions = ({navigation}) => {
        return {
            title: 'Events'
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

        this.props.actionListEvents().then(() => {
            this.setState({refreshing: false});
        }).catch((err) => {
            Alert.alert( 'Error',  err.message,  [ {text: 'OK', onPress: () => console.log('OK Pressed')}, ] )
        });

    }


    componentDidMount(){
        console.log("componentDidMount");
        
        this.props.actionListEvents().then(() => {
            console.log("actionListEvents then");
        }).catch((err) => {
            Alert.alert( 'Error',  err.message,  [ {text: 'OK', onPress: () => console.log('OK Pressed')}, ] )
        });
    };


    renderRow(event) {
        return <ListItem event={event}/>;
    };


    render() {
        return (
            <ListView
                enableEmptySections={true}
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
    console.log( ` ••••••••• EventsList mapStateToProps state.events:`, state.events.entries);
    return {
        events: state.events.entries,
        dataSource: dataSource.cloneWithRows(state.events.entries)
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ actionListEvents }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(EventsList);

