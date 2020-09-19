import React, { Component } from 'react';
import { Text, View, FlatList, TouchableHighlight } from 'react-native';
import { Paragraph, Title } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';

import Hymns from '../dataTest/HymnsData.json';

class HymnScreen extends Component {

    openHymn(hymn)
    {
        Actions.HymnDetail({hymn});  
    }

    renderItem(item)
    {
        const hymn = item.item;
        
        return (
            <TouchableHighlight
                onPress={ () => this.openHymn(item)} 
                underlayColor="#ddd" >
                <View style={styles.rowContainer}>
                    <View>
                        <View style={styles.circleStyle}>
                            <Text style={styles.hymnNumberStyle}>{hymn.number}</Text>
                        </View>
                    </View>

                    <View style={styles.hymnTitleContainerStyle}>
                        <Title>CHB {hymn.number}</Title>
                        <Paragraph>{hymn.title}</Paragraph>
                    </View>
                </View>
            </TouchableHighlight>
            
        );
    }
    render() {
        return (
            <View>
                <FlatList
                    keyExtractor={item => "h" + item.number}
                    data={Hymns}
                    renderItem={this.renderItem.bind(this)}
                />
            </View>
        )
    }
}

const styles = {
    rowContainer: {
        flexDirection: 'row',
        padding: 5,
        borderBottomColor: '#a4a4a4',
        borderBottomWidth: 1
    },

    circleStyle: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderColor: 'red',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },

    hymnNumberStyle: {
        color: "#fff",
        fontSize: 30
    },

    hymnTitleContainerStyle: {
        justifyContent: 'space-around',
        paddingLeft: 10,
    }
}

export default HymnScreen;