import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Text, TouchableWithoutFeedback, View } from 'react-native';

import { CardSection } from './common';
import { actionEventDetails } from '../actions/events_actions';


class ListItem extends Component {
    
    onRowPress() {
        this.props.actionEventDetails(this.props.event);
    }

    render() {
        const { _id, check, output, occurrences , environment ,client} = this.props.event;

        const statuses = [ "Ok", "Warning", "Critical" ];
        const colors = [ "green", "orange", "red" ];

        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View style={styles.containersStyle}>

                    <Text style={styles.titleStyle}> 
                        <Text style={{color: colors[check.status] }}>
                            {statuses[check.status]}
                        </Text>
                    </Text>

                    <Text style={styles.titleStyle}>
                        Source: {client.name}
                    </Text>

                    <Text style={styles.titleStyle}>
                        Check: {check.name}
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
        flexDirection: 'row',
        borderBottomWidth:0
    },
    containersStyle:{
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        borderColor: '#ddd'
    }
};



const mapStateToProps = ({ auth }) => {
    const { } = auth;
    return {  };
};


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ actionEventDetails }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ListItem);



