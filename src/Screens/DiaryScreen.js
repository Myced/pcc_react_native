import React, { Component } from 'react';
import { Text, View, TouchableHighlight, ScrollView } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Button, Icon } from 'react-native-elements';
import { Avatar, Card, Divider, DefaultTheme } from 'react-native-paper';

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

    // getReadingsCardTitle()
    // {
    //     return (

    //     );
    // }

    render() {

const LeftContent = props => <Avatar.Icon icon="alert" {...props} theme={theme   }  />

        return (
            <ScrollView style={styles.containerStyle}>
                <View style={styles.titleContainerStyle}>
                    <Text style={styles.titleTextStyle}>
                        CHURCH DIARY
                    </Text>
                </View>

                <Card style={{marginTop: 20}} elevation={2}>
                    <Card.Content>
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
                    </Card.Content>
                </Card>


                {/* put the view for the parsed date here  */}
                {/* <View style={ styles.parsedDateContainer }>
                    

                    <View style={styles.dateViewBorder}></View>
                </View> */}

                {/* Put the view for the readings */}
                <View>
                    <Card elevation={2} style={styles.parsedDateCard}>
                        
                        <Card.Content>
                            <View style={styles.parsedDateView}>
                                <Text style={[styles.parsedDateText, {alignItems: 'flex-start',}]}>
                                    Thursday 13
                                </Text>

                                <Text style={[styles.parsedDateText, {alignItems: 'flex-end'}]}>
                                    August, 2020
                                </Text>
                            </View>
                            <Divider />

                            <View style={styles.readingsContainer}>
                                <TouchableHighlight
                                    onPress={() => alert('daiary')}
                                    style={styles.readingRow}
                                    underlayColor="#aaa">
                                    <View>
                                        <Text style={styles.readingText}>Matt. 15: 14-23</Text>
                                    </View>
                                </TouchableHighlight>

                                <TouchableHighlight
                                    onPress={() => alert("done")}
                                    style={[styles.readingRow, {backgroundColor: "#fff"}]}
                                    underlayColor="#aaa">
                                    <View>
                                        <Text style={styles.readingText}>
                                            Jer. 14: 19 - 22
                                        </Text>
                                    </View>
                                </TouchableHighlight>

                                <TouchableHighlight
                                    onPress={() => alert("cedric")}
                                    style={styles.readingRow}
                                    underlayColor="#aaa">
                                    <View>
                                        <Text style={styles.readingText}>
                                            Matt. 13: 10 - 17
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                            </View>

                        </Card.Content>
                        
                        <Card.Actions>
                            {/* <Button title="Cancel">Cancel</Button>
                            <Button>Ok</Button> */}
                        </Card.Actions>
                    </Card>
                </View>

                <View>
                    <Card elevation={2} style={styles.parsedDateCard}>
                        
                        <Card.Content>
                            <View style={styles.parsedDateView}>
                                <Text style={[styles.parsedDateText, {alignItems: 'flex-start',}]}>
                                    Thursday 13
                                </Text>

                                <Text style={[styles.parsedDateText, {alignItems: 'flex-end'}]}>
                                    August, 2020
                                </Text>
                            </View>
                            <Divider />

                            <View style={styles.readingsContainer}>

                                <View style={[styles.readingRow, {marginBottom: 2}]}>
                                    <Text style={styles.dayLabel}>
                                        1st Sunday of Easter
                                    </Text>
                                </View>

                                <TouchableHighlight
                                    onPress={() => alert('daiary')}
                                    style={styles.readingRow}
                                    underlayColor="#aaa">
                                    <View style={styles.readingTextViewContainer}>
                                        <Text style={styles.readingLabelStyle}>
                                            Introit Psalms:
                                        </Text>
                                        <Text style={styles.readingText}>Matt. 15: 14-23</Text>
                                    </View>
                                </TouchableHighlight>

                                <TouchableHighlight
                                    onPress={() => alert("done")}
                                    style={[styles.readingRow, {backgroundColor: "#fff"}]}
                                    underlayColor="#aaa">
                                    <View style={styles.readingTextViewContainer}>
                                        <Text style={styles.readingLabelStyle}>
                                            1st Lesson:
                                        </Text>
                                        <Text style={styles.readingText}>
                                            Jer. 14: 19 - 22
                                        </Text>
                                    </View>
                                </TouchableHighlight>

                                <TouchableHighlight
                                    onPress={() => alert("cedric")}
                                    style={styles.readingRow}
                                    underlayColor="#aaa">

                                    <View style={styles.readingTextViewContainer}>
                                        <Text style={styles.readingLabelStyle}>
                                            2nd Lesson:
                                        </Text>
                                        <Text style={styles.readingText}>
                                            Matt. 13: 10 - 17
                                        </Text>
                                    </View>
                                        
                                </TouchableHighlight>

                                <TouchableHighlight
                                    onPress={() => alert("done")}
                                    style={[styles.readingRow, {backgroundColor: "#fff"}]}
                                    underlayColor="#aaa">
                                    <View style={styles.readingTextViewContainer}>
                                        <Text style={styles.readingLabelStyle}>
                                            Text:
                                        </Text>
                                        <Text style={styles.readingText}>
                                            Jer. 14: 19 - 22
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                            </View>

                        </Card.Content>
                        
                        <Card.Actions>
                            {/* <Button title="Cancel">Cancel</Button>
                            <Button>Ok</Button> */}
                        </Card.Actions>
                    </Card>
                </View>

                <View style={styles.errorView}>
                    <Card elevation={2}>
                        <Card.Title title="Error " subtitle="" left={LeftContent} />
                        <Divider />
                        <Card.Content style={{paddingTop: 10, paddingBottom: 10}}>
                            <View>
                                <Text style={styles.errorText}>
                                    You have not yet bought the {this.state.year} diary.
                                </Text>
                                <Text style={styles.errorText}>
                                    Click on the button below to purchase it.
                                </Text>
                                <Text style={styles.errorPriceText}>
                                    Price: 500FCFA
                                </Text>
                            </View>
                        </Card.Content>
                        <Divider />
                        <Card.Actions style={{justifyContent: 'flex-end'}}>
                            <Button
                                title="Buy"
                                buttonStyle={[styles.buttonStyle, styles.buyButtonStyle]}
                                riased
                                onPress={() => alert('pressed')} />
                        </Card.Actions>
                    </Card>
                </View>

            </ScrollView>
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
        // borderWidth: 2,
        // borderColor: 'red',

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
    },

    parsedDateCard: {
        marginTop: 20,
        marginBottom: 20,
    }, 

    parsedDateText: {
        fontWeight: 'bold',
        fontSize: 20
    },

    parsedDateView: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    dateViewBorder: {
        borderColor: 'black',
        borderWidth: 2,
    },

    readingsContainer: {
        // borderWidth: 2,
        // borderColor: 'blue',
        marginTop: 20
    },

    readingRow: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: "#d6d6d6"
    },

    readingText: {
        color: "#0101f7",
        fontSize: 18,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        flex: 1
    },

    readingTextViewContainer: {
        flexDirection: 'row'
    },

    readingLabelStyle: {
        fontSize: 16,
        marginRight: 10,
        fontWeight: '500'
    },

    dayLabel: {
        fontSize: 17,
        fontWeight: 'bold'
    },

    errorView: {
        marginBottom: 20
    },

    errorText: {
        fontSize: 16,
        color: 'red',
        fontWeight: 'bold',
    },

    errorPriceText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10
    },

    buyButtonStyle: {
        paddingLeft: 50,
        paddingRight: 50
    }
}

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: 'red',
        accent: '#f1c40f',
    },
};

export default DiaryScreen;