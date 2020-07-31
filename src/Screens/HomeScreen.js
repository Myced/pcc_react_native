import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
// import BottomNav from '../components/BottomNav';
import { Badge } from 'react-native-paper';

class HomeScreen extends Component {
    render() {
        return (
            <View>
                <Text>Home </Text>
                <Badge>3</Badge>
                <Text>Cedric</Text>
                <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
                    Press me
                </Button>
            </View>
        )
    }
}

export default HomeScreen;