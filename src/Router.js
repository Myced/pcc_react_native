import React from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
import { HomeScreen, HymnScreen, DiaryScreen, BooksScreen, ChurchInfoScreen } from './Screens';
import HomeTab from './Tabs/HomeTab';

const MyRouter = () => {
    return (
        <Router>
            <Stack>
                <Scene key="root" hideNavBar>
                    <Scene key='tabBar' tabs={true} tabBarPosition="bottom" tabBarStyle={styles.tabBar} >
                        <Scene key="home"  title="Home" component={HomeScreen} />
                        <Scene key="diary" title="Diary" component={DiaryScreen} />
                        <Scene key="hymn" title="Hymns" component={HymnScreen} />
                        <Scene key="books" title="Books" component={BooksScreen} />
                        <Scene key="info" title="Church Info" component={ChurchInfoScreen} />
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
    }
}

export default MyRouter;