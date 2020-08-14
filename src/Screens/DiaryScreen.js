import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Button, Icon } from 'react-native-elements';

import { colors } from '../config/Config';

class DiaryScreen extends Component {
    state = {
        day: '',
        month: '',
        year: ""
    };

    renderDayPickerChildren(days)
    {
        return days.map( day => <Picker.Item key={"d_" + day} label={day} value={day} /> )
    }

    renderMonthPickerChildren(months)
    {
        return months.map( month => <Picker.Item key={"m_" + month} label={month} value={month} /> )
    }

    renderYearPickerChildren(years)
    {
        return years.map( year => <Picker.Item key={"y_" + year} label={year} value={year} /> )
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <View style={styles.titleContainerStyle}>
                    <Text style={styles.titleTextStyle}>
                        CHURCH DIARY
                    </Text>
                </View>

                <View style={styles.pickerContainerStyle}>
                    <View style={[styles.pickerGroupContainer, {flex: 1}]}>
                        <Text style={styles.dateLabelStyle}>
                            Day
                        </Text>
                        
                        <Picker
                            style={styles.pickerStyle}
                            selectedValue={this.state.day}
                            prompt="Select Day"
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({day: itemValue})
                            }>
                            {this.renderDayPickerChildren(days)}
                        </Picker>
                    </View>

                    <View style={[styles.pickerGroupContainer, {flex: 2}]}>
                        <Text style={styles.dateLabelStyle}>
                            Month
                        </Text>
                        
                        <Picker
                            style={[styles.pickerStyle, {width: 150}]}
                            selectedValue={this.state.month}
                            prompt="Select Month"
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({month: itemValue})
                            }>
                            {this.renderMonthPickerChildren(months)}
                        </Picker>
                    </View>

                    <View style={[styles.pickerGroupContainer, {flex: 1}]}>
                        <Text style={styles.dateLabelStyle}>
                            Year
                        </Text>
                        
                        <Picker
                            style={styles.pickerStyle}
                            selectedValue={this.state.year}
                            prompt="Select Year"
                            itemStyle={styles.pickerItemStyle}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({year: itemValue})
                            }>
                            {this.renderMonthPickerChildren(years)}
                        </Picker>
                    </View>
                </View>

                <View>
                    <Button
                        title="Find"
                        buttonStyle={styles.buttonStyle}
                        riased
                        icon={
                            <Icon
                              name="search"
                              size={25}
                              color="white"
                            />
                          }
                        onPress={() => alert('pressed')} />
                </View>
            </View>
        )
    }
}

const days = [
                "01", "02", "03", "04", "05", "06", "07", "08", "09",
                "10", "11", "12", "13", "14", "15", "16", "17", "18",
                "19", "20", "21", "22", "23", "24", "25", "26", "27",
                "28", "29", "30", "31"
            ];
const months = [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November",
                    "December"
                ];

const years = ["2018", "2019", "2020", "2021"];

const styles = {
    containerStyle: {
        padding: 5
    },

    titleContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    titleTextStyle: {
        color: colors.primary,
        fontSize: 25,
        fontWeight: 'bold',
    },

    pickerContainerStyle: {
        flexDirection: 'row',

        marginTop: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    pickerStyle: {
        marginTop: -10,
        height: 50, 
        width: 100,
        borderWidth: 2,
        borderColor: 'red'

    },

    pickerItemStyle: {
        color: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },

    pickerGroupContainer: {
        // borderColor: 'red',
        // borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    dateLabelStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    buttonStyle: {
        backgroundColor: 'purple'
    }
}

export default DiaryScreen;