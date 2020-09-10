import React from 'react';
import { Scene, Router, Stack,  Drawer, } from 'react-native-router-flux';
import {
    HomeScreen, HymnScreen, DiaryScreen, BooksScreen, ChurchInfoScreen,
    ChurchCalendarScreen, ChurchHistoryScreen, HealthScreen,
    EducationScreen, CommunicationScreen, PresbyteriesScreen,
    RetiredPastorsScreen, SundaySchoolScreen, EchoScreen, MessengerScreen,
    ReadingOneScreen, ReadingTwoScreen, ReadingTextScreen, ReadingPsalmsScreen
} from './Screens';
import HomeTab from './Tabs/HomeTab';
import { colors } from './config/Config';

const MyRouter = () => {
    return (
        <Router navigationBarStyle={styles.headerStyle} tintColor="#fff" navBarButtonColor="#fff"
            titleStyle={styles.titleStyle} leftButtonIconStyle={styles.leftButtonIconStyle}>

            <Stack>
                
                <Scene key="root" hideNavBar>
                    <Scene key='tabBar' tabs={true} tabBarPosition="bottom" tabBarStyle={styles.tabBar} >
                        <Scene key="home"  title="Home" component={HomeScreen}  />
                        <Scene key="diary" >
                            <Scene key="diaryMain" title="Church Diary" component={DiaryScreen} initial />
                            <Scene key="readingOne" title="1st Lesson" component={ReadingOneScreen} />
                            <Scene key="readingTwo" title="2nd Lesson" component={ReadingTwoScreen} />
                            <Scene key="readingText" title="Text Reading" component={ReadingTextScreen} />
                            <Scene key="readingPsalms" title="Introit Psalms" component={ReadingPsalmsScreen} />
                        </Scene>

                        <Scene key="hymn" title="Hymns" component={HymnScreen} />

                        <Scene key="books" >
                            <Scene key="booksMain" title="Books" component={BooksScreen} />
                            <Scene key="messenger" title="The Messenger" component={MessengerScreen} />
                            <Scene key="echo" title="Presbyterian Echo" component={EchoScreen} />
                        </Scene>

                        <Scene key="info" >
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