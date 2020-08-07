import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import HealtItemCard from '../components/HealtItemCard';
import { colors } from '../config/Config';
import HealthData from '../dataTest/HealtTestData';

class HealthScreen extends Component {

    renderItem(item)
    {
        return <HealtItemCard item={item} />
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <FlatList
                    keyExtractor={ item => "h_" + item.id}
                    data={HealthData}
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