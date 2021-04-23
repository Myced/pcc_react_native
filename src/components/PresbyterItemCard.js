import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

import { colors } from '../config/Config';

class PresbyteryItemCard extends Component {

	state = {
        presbyteries: [],
        tableHead: ['NO', 'Station', 'Worker', 'Telephone'],
        
    }

	render() {
		const state = this.state;
		const presbytery = this.props.item.item;

		const workersData = presbytery.workers;
		
        return (
			<View style={ styles.healthCard }>
				<Text style={ styles.titleStyle }>
					{presbytery.name}
				</Text>
				<Text style={styles.otherStyle}>{ presbytery.presbytery }</Text>
				<Text style={styles.otherStyle}>{ presbytery.sec }</Text>
				<Text style={styles.otherStyle}>{ presbytery.sec_tel }</Text>
				<Text style={styles.otherStyle}>{ presbytery.treasurer }</Text>
				<Text style={styles.otherStyle}>{ presbytery.tre_tel }</Text>
				<Text style={styles.otherStyle}>{ presbytery.chair }</Text>
				<Text style={styles.otherStyle}>{ presbytery.chair_tel }</Text>
				
				<View style={styles.container}>
					<Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
						<Row data={state.tableHead} style={styles.head} flexArr={[0.5, 1, 1, 1]} textStyle={styles.text}/>
						<Rows data={workersData} textStyle={styles.text} flexArr={[0.5, 1, 1, 1]}/>
					</Table>
				</View>
			</View>
        )
    }
}

const styles = {
	healthCard: {
		backgroundColor: "#fff",
		marginTop: 5,
		marginLeft: 5,
		marginRight: 5,
		padding: 5,
		borderRadius: 3
	},

	titleStyle: {
		color: colors.primary,
		fontWeight: 'bold',
		fontSize: 18,
	},

	secretaryStyle: {
		fontSize: 17,
		fontWeight: 'bold',
		marginTop: 4,
		marginBottom: 2
	},

	otherStyle: {
		marginTop: 4,
		marginBottom: 4,
		fontSize: 16,
	},

	// container: { flex: 10, padding: 16, paddingTop: 30,  },
	head: {  height: 40,  backgroundColor: '#f1f8ff'  },
	wrapper: { flexDirection: 'row' },
	title: { flex: 1, backgroundColor: '#f6f8fa' },
	row: {  height: 28  },
	text: { textAlign: 'center' }
}

export default PresbyteryItemCard;