import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import Expo, { AppLoading } from 'expo';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';

import MyRouter from './src/Router';
import { database } from './src/config/Config';

class App extends Component {

    state = {
        databaseExists: null,
        databaseCopied: null,
        appReady: false,
        ready: false,
    }

    // componentDidMount()
    // {
    //     //intialise the database 
    //     this._initDatabase();
    // }

  
    render(){
        // if( ! this.state.appReady)
        // {
        //     console.log("In app not ready");
            
        //     return (
        //         <AppLoading
        //             startAsync={this._initDatabase.bind(this)}
        //             onFinish={() => this.setState({ appReady: true })}
        //             onError={console.warn}
        //             autoHideSplash={false}
        //         />
        //     )
        // }
        
        
        return (
            <PaperProvider>
                <View style={styles.container}>
                    <MyRouter />
                </View>
            </PaperProvider>
        );
    }


    async _initDatabase()
    {
        //get the database uri
        const dburi = `${FileSystem.documentDirectory}SQLite/${database.name}`;
        const app = this;
        console.log("Database Init started");
        

        //check if the database already exists
        await FileSystem.getInfoAsync(dburi, {})
            .then((fileObject) => {
                //check if the file exists 
                if(fileObject.exists)
                {
                    //maybe set the state. =
                    // app.performSql();
                    console.log(app);
                    
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

    async copyDatabase()
    {
        await this.createAppSqliteDirectory();
    }

    async moveDatabaseFromAssets()
    {
        const assetFileUri = Asset.fromModule(
                            require('./assets/db/pcc.db')
                        ).uri;

        const app = this;

        await FileSystem.downloadAsync(
            assetFileUri,
            `${FileSystem.documentDirectory}SQLite/${database.name}`
            )
            .then(({ uri }) => {
                app.performSql();
                this.setState({databaseCopied: true, appReady: true});

            })
            .catch(error => {
                console.log(error);
            });
    }

    async createAppSqliteDirectory()
    {
        const fileUri = `${FileSystem.documentDirectory}SQLite/`;
        const app = this;

        options = {
            immediate: true,
        };

        await FileSystem.makeDirectoryAsync(fileUri, options)
            .then(() => {
                app.moveDatabaseFromAssets();
            })
            .catch((error) => console.log(error)
            )
    }
    
    async performSql() {
        const version = '1.0.0';
        const db = SQLite.openDatabase(database.name, version);
    
        const sql = "select * from hospitals";
    
        await db.transaction(tx => {
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
