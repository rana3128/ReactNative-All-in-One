import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Home extends Component {
    render () {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen with traing and diet cards import from module</Text>
                <Button
                    title="Go to Training"
                    onPress={() => this.props.navigation.navigate('Training')}
                />
                <Button
                    title="Go to Deit"
                    onPress={() => this.props.navigation.navigate('Deit')}
                />
            </View>
        )
    }
}