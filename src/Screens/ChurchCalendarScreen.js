import { YellowBox } from 'react-native'
import React, { Component } from 'react';
import { Text, View, FlatList, ScrollView } from 'react-native';

import { executeSQLQuery } from '../utils/SQLUtil';
import { titleStyle, titleContainer } from '../common/CommonStyles';

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);
  

class ChurchCalendarScreen extends Component {

    state = {
        publicHolidays: [],
        importantDays: [],
        specialCollectsions: [],
    }

    UNSAFE_componentWillMount()
    {
        //loadd pulic holidays 
        this._loadPublicHolidays();  
        this._loadImportantDays();
        this._loadSpecialCollections();      

    }

    _loadPublicHolidays()
    {
        const sql = "SELECT * FROM `public_holidays`";

        executeSQLQuery(sql, [])
            .then( result => this.setState({ publicHolidays: result}) )
            .catch( error => console.error(error) )
    }

    _loadImportantDays()
    {
        const sql = "SELECT * FROM `important_days`";

        executeSQLQuery(sql, [])
            .then( result => this.setState({ importantDays: result}) )
            .catch( error => console.error(error) )
    }

    _loadSpecialCollections()
    {
        const sql = "SELECT * FROM `special_collections`";

        executeSQLQuery(sql, [])
            .then( result => this.setState({ specialCollectsions: result}) )
            .catch( error => console.error(error) )
    }

    renderItem(item)
    {
        const itemObject = item.item;
        let title = '';

        if(itemObject.hasOwnProperty('day'))
        {
            title = itemObject.day;
        }
        else{
            title = itemObject.holiday;
        }

        return (
            <Text style={styles.itemStyle}>{title}</Text>
        )
    }

    render() {
        return (
            <ScrollView>
                <View style={titleContainer}>
                    <Text style={titleStyle}>PUBLIC HOLIDAYS</Text>
                </View>
                <View style={styles.contentStyle}>
                    <FlatList
                        keyExtractor={ (item) => 'ph_' + item.id }
                        data={this.state.publicHolidays}
                        renderItem={this.renderItem}
                        />
                </View>

                <View style={titleContainer}>
                    <Text style={titleStyle}>OTHER IMPORTANT DAYS</Text>
                </View>
                <View style={styles.contentStyle}>
                    <FlatList
                        keyExtractor={ (item) => 'oi_' +  item.id }
                        data={this.state.importantDays}
                        renderItem={this.renderItem}
                        />
                </View>

                <View style={titleContainer}>
                    <Text style={titleStyle}>SPECIAL COLLECTIONS</Text>
                </View>
                <View style={styles.contentStyle}>
                    <FlatList
                        keyExtractor={ (item) => "sp_" + item.id }
                        data={this.state.specialCollectsions}
                        renderItem={this.renderItem}
                        />
                </View>
            </ScrollView>
        )
    }
}

const styles = {
    contentStyle: {
        padding: 10.0,
    },

    itemStyle: {
        fontSize: 17,
        paddingTop: 3,
        paddingBottom: 3,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    }
}

export default ChurchCalendarScreen;