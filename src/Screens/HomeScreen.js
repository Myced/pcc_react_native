import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { colors, Device } from '../config/Config';

class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.homeContainer}>

                <View style={styles.buttonStyle}>
                    <Text style={styles.textStyle}>
                        Church Hymn Book
                    </Text>
                </View>

                <View style={styles.buttonStyle}>
                    <Text style={styles.textStyle}>
                        Hymn
                    </Text>
                </View>

                <View style={styles.buttonStyle}>
                    <Text style={styles.textStyle}>
                        Books
                    </Text>
                </View>

                <View style={styles.buttonStyle}>
                    <Text style={styles.textStyle}>
                        Church Info
                    </Text>
                </View>

            </View>
        )
    }
}

const styles = {
    homeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonStyle: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 40,
        width: Device.width - 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },

    textStyle: {
        color: "#fff",
        fontSize: 25
    }
}

export default HomeScreen;