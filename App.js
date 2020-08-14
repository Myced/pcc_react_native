import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider, Badge } from 'react-native-paper';
// import SQLite from 'react-native-sqlite-storage';
import BottomNav from './src/components/BottomNav';
import MyRouter from './src/Router';

function checkDatabase(){
    global.db = SQLite.openDatabase(
        {
            name: 'SQLite',
            location: 'default',
            createFromLocation: '~pcc.db',
        },

        () => { },

        error => {
             console.log("ERROR: " + error);
        }

    );
}

export default function App() {
  
    return (
        <PaperProvider>
            <View style={styles.container}>
                <MyRouter />
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
