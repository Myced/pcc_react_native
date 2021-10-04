import React, { Component } from 'react';
import { Text, View, FlatList, TouchableHighlight } from 'react-native';
import { Paragraph, Title } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import { Button, Icon } from 'react-native-elements';
import { Avatar, Card, Divider, DefaultTheme } from 'react-native-paper';

import Hymns from '../dataTest/HymnsData.json';
import AsyncKeys from '../utils/AsyncKeys';
import { ItemTypes, getItemCost } from '../utils/ItemType';
import { executeSQLQuery } from '../utils/SQLUtil';

class HymnScreen extends Component {

    state = {
        isPurchased: false,
        itemCode: '',
        itemType: '',
        itemTitle: "Church Hymn Book",
        year: null,
        user: null,
    }

    UNSAFE_componentWillMount()
    {
        this.setUser();
        this.checkHymnAvailability();

        const date = new Date();
        const year = String(date.getFullYear());
        const itemType = ItemTypes.HYMN;
        const itemCode = ItemTypes.HYMN;

        this.setState({year, itemCode, itemType})
    }

    setUser()
    {
        //get the currently logged in user 
        const UserPromise = AsyncStorage.getItem(AsyncKeys.userKey);

        UserPromise.then( user => {
            const finalUser = JSON.parse(user);
            this.setState({user: finalUser});
        } )
        .catch ( error => console.error(error) );
    }

    checkHymnAvailability()
    {
        
        const query = "SELECT * FROM `purchases` WHERE `item_type` = '" + ItemTypes.HYMN + "'";
        const params = [];

        executeSQLQuery(query, params)
            .then( rows => {

                let isPurchased = false;

                rows.forEach(item => {
                    isPurchased = true;
                })

                this.setState({isPurchased});
            } )
            .catch(error => {
                console.error(error);
                
            })
    }

    buyHymn()
    {
		const year = this.state.year;
        const user = this.state.user;
        const amount = getItemCost(ItemTypes.HYMN);
        const title = this.state.itemTitle;
        const itemType = this.state.itemType;
        const itemCode = this.state.itemCode;

        const data = {
            year,
            user,
            amount,
            title,
            itemType,
            itemCode
        };

        Actions.paymentMethod(data);
    }

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
        const LeftContent = props => <Avatar.Icon icon="alert" {...props} theme={theme}  />

        if( this.state.isPurchased )
        {
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
        else {
            return (
                <View style={ styles.centerView }>
                    <View style={styles.errorView}>
                        <Card elevation={2}>
                            <Card.Title title="Error " subtitle="" left={LeftContent} />
                            <Divider />
                            <Card.Content style={{paddingTop: 10, paddingBottom: 10}}>
                                <View>
                                    <Text style={styles.errorText}>
                                        You have not yet bought the CHURCH HYMN BOOK.
                                    </Text>
                                    <Text style={styles.errorText}>
                                        Click on the button below to purchase it.
                                    </Text>
                                    <Text style={styles.errorPriceText}>
                                        Price: { getItemCost(ItemTypes.HYMN) } FCFA
                                    </Text>
                                </View>
                            </Card.Content>
                            <Divider />
                            <Card.Actions style={{justifyContent: 'flex-end'}}>
                                <Button
                                    title="Buy"
                                    buttonStyle={[styles.buttonStyle, styles.buyButtonStyle]}
                                    riased
                                    onPress={this.buyHymn.bind(this)} />
                            </Card.Actions>
                        </Card>
                    </View>
                </View>
            )
        }
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
    },

    buttonStyle: {
        backgroundColor: 'purple'
    },

    centerView: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center'
    },

    errorView: {
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
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

export default HymnScreen;