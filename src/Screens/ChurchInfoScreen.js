import React, { Component } from 'react';
import { Text, View} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';


class ChurchInfoScreen extends Component {
    navigateToCalendar()
    {
        Actions.churchCalendar();
        
    }

    navigateToChurchHistory()
    {
        Actions.churchHistory();
    }

    navigateToHealth()
    {
        Actions.infoHealth();
    }

    navigateToEducation()
    {
        Actions.infoEducation();
    }

    navigateToCommunication()
    {
        Actions.infoCommunication();
    }

    navigateToPresbyteries()
    {
        Actions.presbyteries();
    }

    navigateToRetiredPastors()
    {
        Actions.retiredPastors();
    }

    navigateToSundaySchool()
    {
        Actions.sundaySchool();
    }

    render() {

        const navIcon = 'folder';

        const list = [
            {
                title: 'Church Calender',
                icon: 'insert-invitation',
                topDivider: true,
                onPress: this.navigateToCalendar.bind(this)
            },
            {
                title: 'Church Admin and History',
                icon: 'hourglass-empty',
                onPress: this.navigateToChurchHistory.bind(this)
            },
            {
                title: 'Health',
                icon: 'local-hospital',
                onPress: this.navigateToHealth.bind(this)
            },
            {
                title: 'Education',
                icon: 'local-library',
                onPress: this.navigateToEducation.bind(this)
            },
            {
                title: 'Communication',
                icon: 'record-voice-over',
                onPress: this.navigateToCommunication.bind(this)
            },
            {
                title: 'Presbyteries and Congregation',
                icon: 'settings-input-component',
                onPress: this.navigateToPresbyteries.bind(this)
            },
            {
                title: 'Retired Pastors',
                icon: 'account-circle',
                onPress: this.navigateToRetiredPastors.bind(this)
            },
            {
                title: 'Sunday School',
                icon: 'face',
                onPress: this.navigateToSundaySchool.bind(this)
            },
        ];

        return (
            <View style={{ flex: 1 }}>
                <View style={ styles.headerContainerStyle }>
                    <Text style={styles.headerStyle}>
                        Church Info
                        
                    </Text>
                </View>

                <View>
                {
                    list.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.title}
                            titleStyle={{ color: 'black' }}
                            leftIcon={{ name: item.icon }}
                            onPress={ item.onPress }
                            bottomDivider
                            topDivider={item.topDivider}
                            chevron
                        />
                    ))
                }
                
                </View>

                <View>
                    {/* <Icon name="md-calendar" type="material"></Icon> */}
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