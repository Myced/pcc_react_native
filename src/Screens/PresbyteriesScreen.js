import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

import { executeSQLQuery } from '../utils/SQLUtil';
import { mainContainerStyle } from '../common/CommonStyles';
import PresbyterItemCard from '../components/PresbyterItemCard';

class PresbyteriesScreen extends Component {

    state = {
        presbyteries: [],
    }

    renderItem(item)
    {
        return <PresbyterItemCard item={item} />
    }

    UNSAFE_componentWillMount()
    {
        const sql = "SELECT * FROM presbyteries ";

        executeSQLQuery(sql, [])
            .then( presbyteries => {
                
                //make an sql query to get the workers for all the presbyteries.
                const sql2 = "SELECT * FROM presbytery_workers ";

                executeSQLQuery(sql2, [])
                    .then(result => {
                        
                        let count = 1;
                        result.forEach(worker => {
                            
                            const station = worker.station;
                            const worker_name = worker.worker;
                            const telephone = worker.telephone;

                            //get the presbytery;
                            let presbytery = presbyteries.find( p => p.id  === worker.presbytery )

                            //check if it has its workers 
                            if( ! presbytery.workers )
                            {
                                count = 1;
                                presbytery.workers = [];
                            }
                            

                            const workerData = [
                                count,
                                station, 
                                worker_name,
                                telephone,
                            ]

                            presbytery.workers.push(workerData);

                            count = count + 1;
                            
                        });

                        //load the data into the state.
                        this.setState({presbyteries: presbyteries})

                    })
                    .catch(error => console.log(error));

            })
            .catch( error => console.error(error) )
    }

    render() {
        
        return (
            <View style={mainContainerStyle}>
                <FlatList
                    keyExtractor={ item => "pres_" + item.id}
                    data={this.state.presbyteries}
                    renderItem={this.renderItem}
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
});

export default PresbyteriesScreen;