import React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

const HomeRoute = () => <Text>Home</Text>;
const DiaryRoute = () => <Text>Diary</Text>
const HymnsRoute = () => <Text>Hymns</Text>
const BooksRoute = () => <Text>Books</Text>
const InfoRoute = () => <Text>Info</Text>

const BottomNav = () => {

    const [index, setIndex] = React.useState(0);

    const [routes] = React.useState([
        { key: 'home', title: 'Home', icon: 'home' },
        { key: 'diary', title: 'Diary', icon: 'album' },
        { key: 'hymns', title: 'Hymns', icon: 'history' },
        { key: 'books', title: 'Books', icon: 'history' },
        { key: 'info', title: 'Info', icon: 'history' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeRoute,
        diary: DiaryRoute,
        hymns: HymnsRoute,
        books: BooksRoute,
        info: InfoRoute,
      });
    
    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            />
    )

}

export default BottomNav;