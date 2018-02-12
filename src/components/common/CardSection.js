import React from 'react';
import { View } from 'react-native';


const CardSection = (props) => {
    return (
        <View style={styles.containersStyle}>
            {props.children}
        </View>
    );
};

const styles = {
    containersStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
};

export { CardSection };
