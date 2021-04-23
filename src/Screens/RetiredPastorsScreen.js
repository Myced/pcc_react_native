import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';

import { executeSQLQuery } from '../utils/SQLUtil';
import { mainContainerStyle } from '../common/CommonStyles';
import RetiredPastorsCard from '../components/RetiredPastorsCard';

class RetiredPastorsScreen extends Component {

    state = {
        retiredPastors: []
    };

    UNSAFE_componentWillMount()
    {
        const sql = "SELECT * FROM retired_pastor_presbytary ";

        executeSQLQuery(sql, [])
            .then( result => {
                let presbyteries = result;

                //get the list of pastors for all presbyteries.
                const sql = "SELECT * FROM retired_pastor_list ";

                executeSQLQuery(sql, [])
                    .then(result => {
                        result.forEach( item => {
                            let parent = presbyteries.find( p => p.id  === item.presbytary )
                            
                            if( parent.items ){
                                parent.items.push(item);
                            }
                            else {
                                parent.items = [item];
                            }
                        
                        } )

                        //set the state. 
                        this.setState({retiredPastors: presbyteries})
                    })
                    .catch(error => console.log(error));

            } )
            .catch( error => console.error(error) )
    }

    renderItem(item)
    {
        return <RetiredPastorsCard item={item} />
    }

    render() {
        return (
            <View style={mainContainerStyle}>
                <FlatList
                    keyExtractor={ item => "pas_" + item.id}
                    data={this.state.retiredPastors}
                    renderItem={this.renderItem}
                    />
            </View>
        )
    }
}

export default RetiredPastorsScreen;