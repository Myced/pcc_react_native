import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Picker } from '@react-native-community/picker';

import { colors } from '../config/Config';

class DiaryScreen extends Component {
    state = {
        day: '',
        month: ''
    };

    render() {
        return (
            <View style={styles.containerStyle}>
                <View>
                    <Text style={styles.titleTextStyle}>
                        CHURCH DIARY
                    </Text>
                </View>

                <View>
                    <View>
                        <Text>
                            Day
                        </Text>
                        
                        <Picker
                            selectedValue={this.state.language}
                            style={{height: 50, width: 100}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({language: itemValue})
                            }>
                            <Picker.Item label="Java" value="java" />
                            <Picker.Item label="JavaScript" value="js" />
                        </Picker>
                    </View>
                </View>
            </View>
        )
    }
}

const days = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];
const months = ["January", "February", "March", "April", "May", "June"];

const styles = {
    containerStyle: {
        padding: 5
    },

    titleTextStyle: {
        color: colors.primary,
        fontSize: 25,
        fontWeight: 'bold',
    }
}

export default DiaryScreen;