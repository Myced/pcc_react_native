import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider, Badge } from 'react-native-paper';
import BottomNav from './src/components/BottomNav';
import MyRouter from './src/Router';


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
