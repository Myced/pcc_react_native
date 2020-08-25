import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';

import { colors } from '../config/Config';
import { executeSQLQuery } from '../utils/SQLUtil';
import EducationItemCard from '../components/EducationItemCard';

class EducationScreen extends Component {

    state = {
        educationData: [],
    }

    UNSAFE_componentWillMount()
    {
        const sql = "select * from schools";

        executeSQLQuery(sql, [])
            .then( result => this.setState({ educationData: result}) )
            .catch( error => console.error(error) )
    }

    renderItem(item)
    {
        return (
            <EducationItemCard item={item} />
        )
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <FlatList
                    keyExtractor={ item => "h_" + item.id}
                    data={this.state.educationData}
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

export default EducationScreen;