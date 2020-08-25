import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';

import { colors } from '../config/Config';
import { executeSQLQuery } from '../utils/SQLUtil';
import CommunicationItemCard from '../components/CommunicationItemCard';

class CommunicationScreen extends Component {

    state = {
        communicationData: [],
    }

    componentDidMount()
    {
        //get the data from the database 
        const sql = "select * from communication";

        executeSQLQuery(sql, [])
            .then( result => this.setState({communicationData: result}) )
            .catch( error => console.error(error) )
    }

    renderItem(item)
    {
        return (
            <CommunicationItemCard item={item} />
        )
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <FlatList
                    keyExtractor={ item => "h_" + item.id}
                    data={this.state.communicationData}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        backgroundColor: colors.background,
        flex: 1,
        marginBottom: 0
    }
}

export default CommunicationScreen;