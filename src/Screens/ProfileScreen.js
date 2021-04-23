import React, { Component } from 'react';
import { Card, Icon } from 'react-native-elements';
import {
    Text,
    View,
    FlatList,
    ScrollView,
    StyleSheet,
    ImageBackground,
    Image,
} from 'react-native';

import Email from '../components/Email';
import { getUser } from '../utils/UsetUtil';
import { colors } from '../config/Config';

class ProfileScreen extends Component {

    state = {
        user: null,
    }

    async componentDidMount() {
        //get the user and save 
        const user = await getUser();

        this.setState({ user });
    }

    getName() {
        let name = "";

        if (this.state.user !== null) {
            const user = this.state.user;

            name = user.name;
        }

        return name;
    }

    getTelephone() {
        let telephone = "";

        if (this.state.user !== null) {
            const user = this.state.user;

            telephone = user.tel;
        }

        return telephone;
    }

    getEmail() {
        let email = "";

        if (this.state.user !== null) {
            const user = this.state.user;

            email = user.email;
        }

        return email;
    }

    renderHeader() {
        const avatarImage = require('../../assets/profile.png');
        const backgroundImage = require('../../assets/background.png');

        return (
            <View style = { styles.headerContainer } >
                <ImageBackground style = { styles.headerBackgroundImage } blurRadius = { 5 } source = { backgroundImage } >
                    <View style = { styles.headerColumn }>
                        <Image style = { styles.userImage } source = { avatarImage } />

                        <Text style = { styles.userNameText } >
                            { this.getName() }
                        </Text>

                        <View style = { styles.userAddressRow } >
                            <View>
                                <Icon name = "call" underlayColor = "transparent" iconStyle = { styles.placeIcon } /> 
                            </View>
                            <View style = { styles.userCityRow } >
                                <Text style = { styles.userCityText } >
                                    { this.getTelephone() }
                                </Text>
                            </View>
                        </View>

                        <View style = { styles.userAddressRow } >
                            <View>
                                <Icon name = "email" underlayColor = "transparent" iconStyle = { styles.placeIcon }/> 
                            </View>
                            <View style = { styles.userCityRow } >
                                <Text style = { styles.userCityText } >
                                    { this.getEmail() }
                                </Text> 
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    renderTel() {
        return (
            <Text> 123, 4566, 678 f </Text>
        )
    }

    renderEmail() {
        const email = "tncedric@gmail.com";
        const name = "Cedric";
        const index = 1;
        return (
            <Email key = { `email-${index}` }
                index = { index }
                name = { name }
                email = { email }
                onPressEmail = {
                    () => alert("email pressed") }
            />
        )
    }

    render() {
        return ( 
            <ScrollView style = { styles.scroll }>
                <View style = { styles.container } >
                    <Card containerStyle = { styles.cardContainer } >
                        { this.renderHeader() }
                    </Card> 
                </View> 
                <View style = { styles.contentContainer } >
                    <Text> Me </Text>
                    <Text> Me </Text>
                    <Text> Me </Text>
                    <Text> Me </Text>
                    <Text> Me </Text>
                    <Text> Me </Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFF',
        borderWidth: 0,
        flex: 1,
        margin: 0,
        padding: 0,
    },
    container: {
        flex: 1,
    },
    emailContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 0,
    },
    headerBackgroundImage: {
        paddingBottom: 15,
        paddingTop: 15,
    },
    headerContainer: {},
    headerColumn: {
        backgroundColor: 'transparent',
        ...Platform.select({
            ios: {
                alignItems: 'center',
                elevation: 1,
                marginTop: -1,
            },
            android: {
                alignItems: 'center',
            },
        }),
    },
    placeIcon: {
        color: 'white',
        fontSize: 20,
    },
    scroll: {
        backgroundColor: '#FFF',
    },
    userAddressRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    userCityRow: {
        backgroundColor: 'transparent',
    },
    userCityText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
        paddingLeft: 10,
    },
    userImage: {
        borderColor: '#FFF',
        borderRadius: 85,
        borderWidth: 3,
        height: 170,
        marginBottom: 15,
        width: 170,
    },
    userNameText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        paddingBottom: 8,
        textAlign: 'center',
    },

    contentContainer: {
        padding: 5,
        backgroundColor: colors.background,
        flex: 1
    }
})

export default ProfileScreen;