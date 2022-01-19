import React, { Component } from 'react';
import Expo from 'expo';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import FlashMessage from "react-native-flash-message";

import MyRouter from './src/Router';
import { database } from './src/config/Config';

class App extends Component {

    state = {
        databaseExists: null,
        databaseCopied: null,
        appReady: false,
        ready: false,
    }

    componentDidMount()
    {
        //intialise the database 
        this._initDatabase();
    }

  
    render(){
  
        return (
            <PaperProvider>
                <View style={styles.container}>
                    <MyRouter />
                    <FlashMessage duration={5000} position="top" />
                </View>
            </PaperProvider>
        );
    }


    _initDatabase()
    {
        //get the database uri
        const dburi = `${FileSystem.documentDirectory}SQLite/${database.name}`;
        const app = this;

        //check if the database already exists
        FileSystem.getInfoAsync(dburi, {})
            .then((fileObject) => {
                //check if the file exists 
                if(fileObject.exists)
                {
                    //maybe set the state. =
                    
                    // this.setState({databaseExists: true, appReady: true});
                }
                else {
                    app.copyDatabase();
                }
            })
            .catch( error => {
                console.log(error)
            });
    }

    copyDatabase()
    {
        this.createAppSqliteDirectory();
    }

    moveDatabaseFromAssets()
    {
        const assetFileUri = Asset.fromModule(
                            require('./assets/db/pcc.db')
                        ).uri;

        const app = this;

        FileSystem.downloadAsync(
            assetFileUri,
            `${FileSystem.documentDirectory}SQLite/${database.name}`
            )
            .then(({ uri }) => {
                app.performSql();
                // this.setState({databaseCopied: true, appReady: true});

            })
            .catch(error => {
                console.log(error);
            });
    }

    createAppSqliteDirectory()
    {
        const fileUri = `${FileSystem.documentDirectory}SQLite/`;
        const app = this;

        options = {
            immediate: true,
        };

        FileSystem.makeDirectoryAsync(fileUri, options)
            .then(() => {
                app.moveDatabaseFromAssets();
            })
            .catch((error) => console.log(error)
            )
    }
    
    performSql() {
        const version = '1.0.0';
        const db = SQLite.openDatabase(database.name, version);
    
        const sql = "select * from hospitals";
    
        db.transaction(tx => {
            tx.executeSql(
                sql,
                [],
    
                (_, resultSet) => {
                    console.log("Sql success");
                    console.log(resultSet); 
                },
    
                (_, error) => {
                    console.log("Sql error");
                    
                    console.error(error);
                },
                
            )
            
          },
            (error) => { console.log("failed"); console.log(error);
             } //console.log(error); }
            ,
            () => console.log("Transaction success")
          );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default App;
