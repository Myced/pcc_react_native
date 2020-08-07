import React from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
import {
    HomeScreen, HymnScreen, DiaryScreen, BooksScreen, ChurchInfoScreen,
    ChurchCalendarScreen, ChurchHistoryScreen, HealthScreen,
    EducationScreen, CommunicationScreen, PresbyteriesScreen,
    RetiredPastorsScreen, SundaySchoolScreen
} from './Screens';
import HomeTab from './Tabs/HomeTab';
import { colors } from './config/Config';

const MyRouter = () => {
    return (
        <Router navigationBarStyle={styles.headerStyle} titleStyle={styles.titleStyle}>
            <Stack>
                <Scene key="root" hideNavBar>
                    <Scene key='tabBar' tabs={true} tabBarPosition="bottom" tabBarStyle={styles.tabBar} >
                        <Scene key="home"  title="Home" component={HomeScreen} />
                        <Scene key="diary" title="Church Diary" component={DiaryScreen} />
                        <Scene key="hymn" title="Hymns" component={HymnScreen} />
                        <Scene key="books" title="Books" component={BooksScreen} />
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
    }
}

export default MyRouter;