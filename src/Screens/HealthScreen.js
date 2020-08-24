import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';

import HealtItemCard from '../components/HealtItemCard';
import { colors } from '../config/Config';
import HealthData from '../dataTest/HealtTestData';
import { executeSQLQuery } from '../utils/SQLUtil';

class HealthScreen extends Component {

    state = {
        healthData: [],
    }

    componentDidMount()
    {
        //get the data from the database.
        const sql = "SELECT * from hospitals";

        executeSQLQuery(sql, [])
            .then((result) => {
                this.setState({healthData: result});
            })
            .catch( (error) => {
                console.error(error);
            });
    }

    renderItem(item)
    {
        return <HealtItemCard item={item} />
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <FlatList
                    keyExtractor={ item => "h_" + item.id}
                    data={this.state.healthData}
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
        paddingBottom: 10
    }
}

export default HealthScreen;