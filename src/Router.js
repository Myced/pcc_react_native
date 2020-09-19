import React, { Component } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Scene, Router, Stack,  Drawer, } from 'react-native-router-flux';

import {
    HomeScreen, HymnScreen, DiaryScreen, BooksScreen, ChurchInfoScreen,
    ChurchCalendarScreen, ChurchHistoryScreen, HealthScreen,
    EducationScreen, CommunicationScreen, PresbyteriesScreen,
    RetiredPastorsScreen, SundaySchoolScreen, EchoScreen, MessengerScreen,
    ReadingOneScreen, ReadingTwoScreen, ReadingTextScreen, ReadingPsalmsScreen,
    LoginScreen, RegisterScreen, PDFReaderScreen
} from './Screens';

import ProgressDialog from './components/ProgressDialog';
import HomeTab from './Tabs/HomeTab';
import HymnsTab from './Tabs/HymnsTab';
import BooksTab from './Tabs/BooksTab';
import DiaryTab from './Tabs/DiaryTab';
import InfoTab from './Tabs/InfoTab';
import { colors } from './config/Config';
import AsyncKeys from './utils/AsyncKeys';

class MyRouter extends Component {
    
    state = {
        user: null,
        loading: true
    }

    UNSAFE_componentWillMount()
    {
        //try to get the authenticated user. 
        const userPromise = AsyncStorage.getItem(AsyncKeys.userKey);

        userPromise.then( user => {
                        this.setState({user: JSON.parse(user), loading: false})
                    } )
                    .catch(error => {
                        this.setState({loading: false});
                        console.error(error)
                    } )
        
    }

    renderNavigation()
    {
        if(this.state.user === null)
        {
            return (
                <Scene key="root" hideNavBar>
                        
                    <Scene key="Auth">
                        <Scene key="Login" title="Welcome" component={LoginScreen} />
                        <Scene key="Register" title="Register" component={RegisterScreen} />
                    </Scene>

                    <Scene key='tabBar' tabs={true} tabBarPosition="bottom" tabBarStyle={styles.tabBar} >
                                    
                        <Scene key="Home"  title="Home" icon={HomeTab} component={HomeScreen}  />
                        <Scene key="Diary" icon={DiaryTab}>
                            <Scene key="diaryMain" title="Church Diary" component={DiaryScreen} initial />
                            <Scene key="readingOne" title="1st Lesson" component={ReadingOneScreen} />
                            <Scene key="readingTwo" title="2nd Lesson" component={ReadingTwoScreen} />
                            <Scene key="readingText" title="Text Reading" component={ReadingTextScreen} />
                            <Scene key="readingPsalms" title="Introit Psalms" component={ReadingPsalmsScreen} />
                        </Scene>

                        <Scene key="Hymn" title="Hymns" component={HymnScreen} icon={HymnsTab} />

                        <Scene key="Books" icon={BooksTab}>
                            <Scene key="booksMain" title="Books" component={BooksScreen} />
                            <Scene key="messenger" title="The Messenger" component={MessengerScreen} />
                            <Scene key="echo" title="Presbyterian Echo" component={EchoScreen} />
                        </Scene>

                        <Scene key="Info" icon={InfoTab}>
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
                </Scene>
                
            )
        }

        return (
            <Scene key="root" hideNavBar>
                        
                    <Scene key='tabBar' tabs={true} tabBarPosition="bottom" tabBarStyle={styles.tabBar} >
                                    
                        <Scene key="Home"  title="Home" icon={HomeTab} component={HomeScreen}  />
                        <Scene key="Diary" icon={DiaryTab}>
                            <Scene key="diaryMain" title="Church Diary" component={DiaryScreen} initial />
                            <Scene key="readingOne" title="1st Lesson" component={ReadingOneScreen} />
                            <Scene key="readingTwo" title="2nd Lesson" component={ReadingTwoScreen} />
                            <Scene key="readingText" title="Text Reading" component={ReadingTextScreen} />
                            <Scene key="readingPsalms" title="Introit Psalms" component={ReadingPsalmsScreen} />
                        </Scene>

                        <Scene key="Hymn" title="Hymns" component={HymnScreen} icon={HymnsTab} />

                        <Scene key="Books" icon={BooksTab}>
                            <Scene key="booksMain" title="Books" component={BooksScreen} />
                            <Scene key="messenger" title="The Messenger" component={MessengerScreen} />
                            <Scene key="echo" title="Presbyterian Echo" component={EchoScreen} />
                            <Scene key="PDFReader" title="Read Magazine" component={PDFReaderScreen} />
                        </Scene>

                        <Scene key="Info" icon={InfoTab}>
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
                </Scene>
        )
    }

    render()
    {
        if(this.state.loading)
        {
            return (
                <ProgressDialog 
                    label="Loading app....."
                    visible={this.state.loading}
                    />
            )
        }
        return (
            <Router navigationBarStyle={styles.headerStyle} tintColor="#fff" navBarButtonColor="#fff"
                titleStyle={styles.titleStyle} leftButtonIconStyle={styles.leftButtonIconStyle}>
    
                <Stack>

                    {this.renderNavigation()}
    
                    {/* <Drawer title="Drawer" key="drawer" drawer  drawerWidth={220}>
                        <Scene key="rootDrawer">
                            <Scene key="Login" drawer={false} component={HomeScreen} initial={true} hideNavBar/>
                            <Scene key="Diary" component={DiaryScreen} title="Anasayfa" initial={false} renderLeftButton={null} />
                            <Scene key="Cari" component={ChurchInfoScreen} title="Cari" />
                        </Scene>
                    </Drawer> */}
    
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