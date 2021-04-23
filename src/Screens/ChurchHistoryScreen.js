import React, { Component } from 'react';
import { Text, View, FlatList, ScrollView } from 'react-native';

import { colors } from '../config/Config';
import { executeSQLQuery } from '../utils/SQLUtil';
import { titleContainer, titleStyle, mainContainerStyle } from '../common/CommonStyles';
import CommitteeItemCard from '../components/CommitteeItemCard';
import HistoryItemCard from '../components/HistoryItemCard';

class ChurchHistoryScreen extends Component {

    state = {
        historyData: [],
        committeeData: [],
    }

    componentDidMount()
    {
        this._loadHistoryData();
        this._loadCommitteeData();
    }

    _loadHistoryData()
    {
        //get the data from the database 
        const sql = "select * from church_info";

        executeSQLQuery(sql, [])
            .then( result => this.setState({historyData: result}) )
            .catch( error => console.error(error) )
    }

    _loadCommitteeData()
    {
        //get the data from the database 
        const sql = "select * from `church_address`";

        executeSQLQuery(sql, [])
            .then( result => this.setState({committeeData: result}) )
            .catch( error => console.error(error) )
    }

    renderHistoryItem(item)
    {

    }

    renderHistoryItem(item)
    {
        const historyItem = item.item;

        return (
            <HistoryItemCard
                item={historyItem}>

            </HistoryItemCard>
        )
    }

    renderCommitteeItem(item)
    {
        const address = item.item;

        return (
            <CommitteeItemCard
                item={address}>

            </CommitteeItemCard>
        )
    }

    render() {
        return (
            <ScrollView style={mainContainerStyle}>
                <View>
                    <FlatList
                            keyExtractor={ item => "h_" + item.id}
                            data={this.state.historyData}
                            renderItem={this.renderHistoryItem}
                            />
                </View>

                <View style={[titleContainer, {marginTop: 50}]}>
                    <Text style={titleStyle}> Church Address & Committee </Text>
                </View>
                
                <View>
                    <FlatList
                        keyExtractor={ item => "h_" + item.id}
                        data={this.state.committeeData}
                        renderItem={this.renderCommitteeItem}
                        />
                </View>
            </ScrollView>
            
        )
    }
}

const styles = {
    containerStyle: {
        backgroundColor: colors.background,
        flex: 1,
        paddingBottom: 10
    }
}

export default ChurchHistoryScreen;