import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';

import { colors } from '../config/Config';

class ChurchHistoryScreen extends Component {

    state = {
        historyData: [],
        committeeData: [],
    }

    renderHistoryItem(item)
    {

    }

    renderCommitteeItem(item)
    {
        
    }

    render() {
        return (
            <View>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleStyle}> CHURCH HISTORY </Text>
                </View>
                <View>

                </View>
            </View>
            
        )
    }
}

const styles = {

    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    titleStyle: {
        color: colors.primary,
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
    }
}

export default ChurchHistoryScreen;