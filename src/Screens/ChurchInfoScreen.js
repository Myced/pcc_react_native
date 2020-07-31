import React, { Component } from 'react';
import { Text, View} from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons';


class ChurchInfoScreen extends Component {
    render() {

        const navIcon = {};

        const list = [
            {
                title: 'Church Calender',
                icon: navIcon,
                topDivider: true,
            },
            {
                title: 'Church Admin and History',
                icon: 'flight-takeoff'
            },
            {
                title: 'Health',
                icon: 'flight-takeoff'
            },
            {
                title: 'Education',
                icon: 'flight-takeoff'
            },
            {
                title: 'Communication',
                icon: 'flight-takeoff'
            },
            {
                title: 'Presbyteries and Congregation',
                icon: 'flight-takeoff'
            },
            {
                title: 'Retired Pastors',
                icon: 'flight-takeoff'
            },
            {
                title: 'Sunday School',
                icon: 'alarm'
            },
        ];

        return (
            <View style={{ flex: 1 }}>
                <View style={ styles.headerContainerStyle }>
                    <Text style={ styles.headerStyle }> Church Info</Text>
                </View>

                <View>
                {
                    list.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.title}
                            titleStyle={{ color: 'black' }}
                            leftIcon={{ name: item.icon }}
                            onPress={ () => console.log("Pressed")
                                }
                            bottomDivider
                            topDivider={item.topDivider}
                            chevron
                        />
                    ))
                }
                
                </View>

                
            </View>
            
        )
    }
}

const styles = {
    headerContainerStyle: {
        alignItems: 'center',
        paddingTop: 10,
        marginBottom: 20
    },

    headerStyle: {
        fontSize: 30,
        fontWeight: '700'
    }
}

export default ChurchInfoScreen;