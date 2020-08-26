import React, { Component } from 'react';
import { Text, View, TouchableHighlight, ScrollView } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Button, Icon } from 'react-native-elements';
import { Avatar, Card, Divider, DefaultTheme } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';

import { colors } from '../config/Config';
import { DateUtil } from '../utils/DateUtil';
import { executeSQLQuery } from '../utils/SQLUtil';
import days from '../data/days.json';
import years from '../data/years';
import months from '../data/months.json';

class DiaryScreen extends Component {
    state = {
        day: '',
        month: '',
        year: "",
        date: "",
        datePartDay: "",
        datePartYear: "",
        readingLabel: "",
        readingOne: "",
        readingTwo: "",
        readingText: "",
        readingPsalms: "",
        activatedYears: ["2018", "2019"],
    };

    //initialise the date 
    UNSAFE_componentWillMount()
    {
        const date = new Date();

        const day = String(date.getDate());
        let month = String(date.getMonth()+1);
        const year = String(date.getFullYear());

        //if the length is 1, prefix a zero
        if( month.length === 1 )
        {
            month = "0" + month;
        }

        const dateToday = year + "-" + month + "-" + day;

        const dateUtil = new DateUtil(dateToday);

        this.setDateViews(day, month, year, dateUtil);
    }

    dateFilterCallback()
    {
        const day = this.state.day;
        const month = this.state.month;
        const year = this.state.year;

        const date = year + "-" + month + "-" + day;
        
        const dateUtil = new DateUtil(date);

        //reinitialise the readings to empty values 
        this.setState({
            readingLabel: "", 
            readingOne: "",
            readingTwo: "",
            readingText: ""
        },
        () => this.setDateViews(day, month, year, dateUtil)
        )

    }

    setDateViews(day, month, year, dateUtil)
    {
        const date = year + "-" + month + "-" + day;
        const datePartDay = dateUtil.dayName + " " + dateUtil.day;
        let datePartYear = ""

        if(dateUtil.dayName !== "")
        {
            datePartYear = dateUtil.monthName + ", " + dateUtil.year;
        } 

        this.setState({day, month, year, datePartDay, datePartYear}, () => {
            this.getReadings();
        });
    }

    getReadings()
    {
        const date = this.state.day + "/" + this.state.month + "/" + this.state.year;
        
        const sql = "select * from scriptures where date = \"" + date + "\"";

        executeSQLQuery(sql)
            .then(result => {
                if(result.length !== 0)
                {
                    //get the result object 
                    const object = result[0];

                    const readingLabel = object.name;
                    const readingOne = object.reading_one;
                    const readingTwo = object.reading_two;
                    const readingText = object.text;
                    const readingPsalms = object.psalms;

                    //set this on the state now. 
                    this.setState({
                        readingLabel, readingOne, readingTwo,
                        readingText, readingPsalms
                    })
                }
            })
            .catch(error => {
                console.error(error);
                
            })
        
    }

    renderDayPickerChildren(days)
    {
        return days.map( day => <Picker.Item key={"d_" + day} label={day} value={day} /> )
    }

    renderMonthPickerChildren(months)
    {
        return months.map( month => <Picker.Item key={"m_" + month.number} label={month.name} value={month.number} /> )
    }

    renderYearPickerChildren(years)
    {
        return years.map( year => <Picker.Item key={"y_" + year} label={year} value={year} /> )
    }

    navigateToReadingOne()
    {
        const reading = this.state.readingOne;

        if(reading !== "")
        {
            Actions.readingOne({reading});
        }
    }

    navigateToReadingTwo()
    {
        const reading = this.state.readingTwo;
        
        if(reading !== "")
        {
            Actions.readingTwo({reading});
        }
    }

    navigatteToReadingText()
    {
        const reading = this.state.readingText;
        
        if(reading !== "")
        {
            Actions.readingText({reading});
        }
    }

    navigateToReadingPsalms()
    {
        const reading = this.state.readingPsalms;
        
        if(reading !== "")
        {
            Actions.readingPsalms({reading});
        }
    }

    renderReadingsView()
    {
        //get the selected year first 
        const year = this.state.year;
        const LeftContent = props => <Avatar.Icon icon="alert" {...props} theme={theme   }  />

        //check if the year is in the list of active years
        if( ! this.state.activatedYears.includes(year))
        {
            return (
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
            )
        }

        if(this.state.readingLabel === "" || this.state.readingLabel === null)
        {
            return (
                <View>
                    <Card elevation={2} style={styles.parsedDateCard}>
                        
                        <Card.Content>
                            <View style={styles.parsedDateView}>
                                <Text style={[styles.parsedDateText, {alignItems: 'flex-start',}]}>
                                    {this.state.datePartDay}
                                </Text>

                                <Text style={[styles.parsedDateText, {alignItems: 'flex-end'}]}>
                                    { this.state.datePartYear }
                                </Text>
                            </View>
                            <Divider />

                            <View style={styles.readingsContainer}>
                                <TouchableHighlight
                                    onPress={() => this.navigateToReadingOne() }
                                    style={styles.readingRow}
                                    underlayColor="#aaa">
                                    <View>
                                        <Text style={styles.readingText}>
                                            {this.state.readingOne}
                                        </Text>
                                    </View>
                                </TouchableHighlight>

                                <TouchableHighlight
                                    onPress={() => this.navigateToReadingTwo() }
                                    style={[styles.readingRow, {backgroundColor: "#fff"}]}
                                    underlayColor="#aaa">
                                    <View>
                                        <Text style={styles.readingText}>
                                            {this.state.readingTwo}
                                        </Text>
                                    </View>
                                </TouchableHighlight>

                                <TouchableHighlight
                                    onPress={() => this.navigatteToReadingText() }
                                    style={styles.readingRow}
                                    underlayColor="#aaa">
                                    <View>
                                        <Text style={styles.readingText}>
                                            {this.state.readingText}
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
            )
        }

        return (
            <View>
                <Card elevation={2} style={styles.parsedDateCard}>
                    
                    <Card.Content>
                        <View style={styles.parsedDateView}>
                            <Text style={[styles.parsedDateText, {alignItems: 'flex-start',}]}>
                                {this.state.datePartDay}
                            </Text>

                            <Text style={[styles.parsedDateText, {alignItems: 'flex-end'}]}>
                                {this.state.datePartYear}
                            </Text>
                        </View>
                        <Divider />

                        <View style={styles.readingsContainer}>

                            <View style={[styles.readingRow, {marginBottom: 2}]}>
                                <Text style={styles.dayLabel}>
                                    {this.state.readingLabel}
                                </Text>
                            </View>

                            <TouchableHighlight
                                onPress={() => this.navigateToReadingPsalms() }
                                style={styles.readingRow}
                                underlayColor="#aaa">
                                <View style={styles.readingTextViewContainer}>
                                    <Text style={styles.readingLabelStyle}>
                                        Introit Psalms:
                                    </Text>
                                    <Text style={styles.readingText}>
                                        {this.state.readingPsalms}
                                    </Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight
                                onPress={() => this.navigateToReadingOne() }
                                style={[styles.readingRow, {backgroundColor: "#fff"}]}
                                underlayColor="#aaa">
                                <View style={styles.readingTextViewContainer}>
                                    <Text style={styles.readingLabelStyle}>
                                        1st Lesson:
                                    </Text>
                                    <Text style={styles.readingText}>
                                        {this.state.readingOne}
                                    </Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight
                                onPress={() => this.navigateToReadingTwo() }
                                style={styles.readingRow}
                                underlayColor="#aaa">

                                <View style={styles.readingTextViewContainer}>
                                    <Text style={styles.readingLabelStyle}>
                                        2nd Lesson:
                                    </Text>
                                    <Text style={styles.readingText}>
                                        {this.state.readingTwo}
                                    </Text>
                                </View>
                                    
                            </TouchableHighlight>

                            <TouchableHighlight
                                onPress={() => this.navigatteToReadingText() }
                                style={[styles.readingRow, {backgroundColor: "#fff"}]}
                                underlayColor="#aaa">
                                <View style={styles.readingTextViewContainer}>
                                    <Text style={styles.readingLabelStyle}>
                                        Text:
                                    </Text>
                                    <Text style={styles.readingText}>
                                        {this.state.readingText}
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
        )
    }

    render() {

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
                                    {this.renderYearPickerChildren(years)}
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
                                onPress={ this.dateFilterCallback.bind(this) }/>
                        </View>
                    </Card.Content>
                </Card>

                {/* Put the view for the readings */}
                {this.renderReadingsView()}

            </ScrollView>
        )
    }
}

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
        marginTop: 20,
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