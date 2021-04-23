import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Rows, Cols } from 'react-native-table-component';

import { executeSQLQuery } from '../utils/SQLUtil';
import { titleContainer, titleStyle, containerStyle } from '../common/CommonStyles';

class SundaySchoolScreen extends Component {

    state = {
        tableData: [],
    }

    addNewLines(text)
    {
        let result = "";

        if(text.includes("\\n"))
        {
            const parts = text.split("\\n");
            
            //join the strings 
            for(let i = 0; i < parts.length; i++)
            {
                const part = parts[i];

                if(i !== 0  || i !== parts.length - 1)
                {
                    result = result + "\n";
                }
                
                result = result + part;

            }
        }
        else{
            result = text;
        }

        return result;
    }

    UNSAFE_componentWillMount()
    {
        const sql = "SELECT * FROM `sunday_school_lessons`";

        let sundaySchoolData = [];

            executeSQLQuery(sql, [])
                .then(result => {
                    
                    result.forEach(object => {
                        let row = [];

                        row.push(this.addNewLines(object.Date));
                        row.push(this.addNewLines(object.event));
                        row.push(this.addNewLines(object.ln));
                        row.push(this.addNewLines(object.study_title));
                        row.push(this.addNewLines(object.text));
                        row.push(this.addNewLines(object.prayer));

                        sundaySchoolData.push(row);
                    })

                    //set the state 
                    this.setState({tableData: sundaySchoolData});

                })
                .then( error => console.log(error) )
    }

    render() {
        const headings = ["Date", "Event", "LN", "Bible Study Title", "Text", "Prayer"];
        const flexArray = [ 1, 2, 1, 6, 2, 2 ];

        return (
            <View style={ containerStyle }>
                <View style={ titleContainer }>
                    <Text style={ titleStyle }>Sunday School Program</Text>
                </View>

                <ScrollView horizontal>
                    <ScrollView>
                        <Table borderStyle={{borderWidth: 2, borderColor: '#000'}}>
                            <Row data={headings}  
                                style={styles.header} 
                                textStyle={styles.headerText}
                                flexArr={flexArray}
                                />
                            <Rows
                                data={this.state.tableData}
                                textStyle={styles.rowText}
                                flexArr={flexArray}
                                />
                        </Table>
                    </ScrollView>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    header: { 
    },
    headerText: { 
        textAlign: 'center', 
        fontWeight: '700',
        padding: 25,
        fontSize: 18,
    },
    rowText: {
        padding: 25,
        width: 100
    },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#E7E6E1' }
  });

export default SundaySchoolScreen;