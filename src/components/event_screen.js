
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Text, View, Image, Linking } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';

import {} from '../actions/events_actions';

class EventDetail extends Component {

    static navigationOptions = {
        title: 'Detail'
    };


    render() {

        const {
            _id,
            client,
            check
        } = this.props.event;

        const {
            thumbnailStyle,
            headerContentStyles,
            thumbnailContainerStyle,
            headerTextStyle,
            imageStyle
        } = styles;


        const statuses = [ "Ok", "Warning", "Critical" ];
        const colors = [ "green", "orange", "red" ];


        return (

            <Card>

                <CardSection>
                    <View style={thumbnailContainerStyle}>
                        <Image style={thumbnailStyle}
                               source={require('../../img/sensu.png')}
                        />
                    </View>
                </CardSection>


                <CardSection>
                    <View style={headerContentStyles}>
                        <Text style={headerTextStyle}>{_id}</Text>
                    </View>
                </CardSection>


                <CardSection>
                    <View style={headerContentStyles}>
                        <Text style={headerTextStyle}>{check.output}</Text>
                    </View>
                </CardSection>



                <CardSection>
                    <View style={headerContentStyles}>
                        <Text style={headerTextStyle}>
                        status:
                        <Text style={{color: colors[check.status] }}>
                            {statuses[check.status]}
                        </Text>
                        </Text>
                    </View>
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
    return {
        event: state.events.selected
    };

}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);


