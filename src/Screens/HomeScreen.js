import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { colors, Device } from '../config/Config';

class HomeScreen extends Component {

    navigateToHymns()
    {
        Actions.Hymn();
    }

    navigateToDiary()
    {
        Actions.Diary();
    }

    navigateToBooks()
    {
        Actions.Books();
    }

    navigateToInfo()
    {
        Actions.Info();
    }

    navigateToProfile()
    {
        Actions.profile();
    }

    render() {
        return (
            <View style={styles.homeContainer}>

                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor="#f40077"
                    onPress={ this.navigateToDiary }
                    style={styles.buttonStyle}
                    >
                    <Text style={styles.textStyle}>
                        Church Diary
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor="#f40077"
                    onPress={ this.navigateToHymns }
                    style={styles.buttonStyle}
                    >
                    <Text style={styles.textStyle}>
                        Church Hymn Book
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor="#f40077"
                    onPress={ this.navigateToBooks }
                    style={styles.buttonStyle}
                    >
                    <Text style={styles.textStyle}>
                        Books and Magazines
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor="#f40077"
                    onPress={ this.navigateToInfo }
                    style={styles.buttonStyle}
                    >
                    <Text style={styles.textStyle}>
                        Church Information
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor="#f40077"
                    onPress={ this.navigateToProfile }
                    style={styles.buttonStyle}
                    >
                    <Text style={styles.textStyle}>
                        Profile.
                    </Text>
                </TouchableHighlight>

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