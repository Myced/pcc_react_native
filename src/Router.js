import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Scene, Router, Stack,  Drawer, } from 'react-native-router-flux';

import {
    HomeScreen, HymnScreen, DiaryScreen, BooksScreen, ChurchInfoScreen,
    ChurchCalendarScreen, ChurchHistoryScreen, HealthScreen,
    EducationScreen, CommunicationScreen, PresbyteriesScreen,
    RetiredPastorsScreen, SundaySchoolScreen, EchoScreen, MessengerScreen,
    ReadingOneScreen, ReadingTwoScreen, ReadingTextScreen, ReadingPsalmsScreen,
    LoginScreen, RegisterScreen
} from './Screens';
import HomeTab from './Tabs/HomeTab';
import { colors } from './config/Config';
import AsyncKeys from './utils/AsyncKeys';

class MyRouter extends Component {
    
    state = {
        user: null
    }

    UNSAFE_componentWillMount()
    {
        //try to get the authenticated user. 
        const userPromise = AsyncStorage.getItem(AsyncKeys.userKey);

        userPromise.then( user => this.setState({user: JSON.parse(user)}) )
                    .catch(error => console.error(error) )
        
    }

    renderNavigation()
    {
        if(this.state.user === null)
        {
            return (
                <Scene key="Auth">
                    <Scene key="Login" title="Welcome" component={LoginScreen} />
                    <Scene key="Register" title="Register" component={RegisterScreen} />
                </Scene>
            )
        }
        else {
            return (
                <Scene key='tabBar' tabs={true} tabBarPosition="bottom" tabBarStyle={styles.tabBar} >
                            
                    <Scene key="Home"  title="Home" icon={HomeTab} component={HomeScreen}  />
                    <Scene key="Diary" >
                        <Scene key="diaryMain" title="Church Diary" component={DiaryScreen} initial />
                        <Scene key="readingOne" title="1st Lesson" component={ReadingOneScreen} />
                        <Scene key="readingTwo" title="2nd Lesson" component={ReadingTwoScreen} />
                        <Scene key="readingText" title="Text Reading" component={ReadingTextScreen} />
                        <Scene key="readingPsalms" title="Introit Psalms" component={ReadingPsalmsScreen} />
                    </Scene>

                    <Scene key="Hymn" title="Hymns" component={HymnScreen} />

                    <Scene key="Books" >
                        <Scene key="booksMain" title="Books" component={BooksScreen} />
                        <Scene key="messenger" title="The Messenger" component={MessengerScreen} />
                        <Scene key="echo" title="Presbyterian Echo" component={EchoScreen} />
                    </Scene>

                    <Scene key="Info" >
                        <Scene key="church_info" title="Church Info" component={ChurchInfoScreen} />
                        <Scene key="churchCalendar" title="Church Calendar" component={ChurchCalendarScreen} />
                        <Scene key="churchHistory" title="Church History" component={ChurchHistoryScreen} />
                        <Scene key="infoHealth" title="Health" component={HealthScreen} />
                        <Scene key="infoEducation" title="Education" component={EducationScreen} />
                        <Scene key="infoCommunication" title="Communication" component={CommunicationScreen} />
                        <Scene key="presbyteries" title="Presbyteries and Congregation" component={PresbyteriesScreen} />
                        <Scene key="retiredPastors" title="Retired Pastors" component={RetiredPastorsScreen} />
                        <Scene key="sundaySchool" title="Sunday School" component={SundaySchoolScreen} />
                    </Scene>
                </Scene>
            )
        }
    }

    render()
    {
        return (
            <Router navigationBarStyle={styles.headerStyle} tintColor="#fff" navBarButtonColor="#fff"
                titleStyle={styles.titleStyle} leftButtonIconStyle={styles.leftButtonIconStyle}>
    
                <Stack>
                    
                    <Scene key="root" hideNavBar>
                        
                        {this.renderNavigation()}
                        
                    </Scene>
    
                    <Drawer title="Drawer" key="drawer" drawer  drawerWidth={220}>
                        <Scene key="rootDrawer">
                            <Scene key="Login" drawer={false} component={HomeScreen} initial={true} hideNavBar/>
                            <Scene key="Diary" component={DiaryScreen} title="Anasayfa" initial={false} renderLeftButton={null} />
                            <Scene key="Cari" component={ChurchInfoScreen} title="Cari" />
                        </Scene>
                    </Drawer>
    
                </Stack>
            </Router>
        );
    }

}

const styles = {
    tabBar: {
        height: 50,
        borderTopColor: 'darkgrey',
        borderTopWidth: 1,
        opacity: 0.98,
        justifyContent:'space-between'
    },

    headerStyle: {
        backgroundColor: colors.primary,
    },

    titleStyle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: 'bold',
    },

    leftButtonIconStyle: {
        color: "#fff",
    }
}

export default MyRouter;