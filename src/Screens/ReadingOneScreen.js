import React, { Component } from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

import { executeSQLQuery } from '../utils/SQLUtil';
import ScriptureTextParser from '../utils/ScriptureTextParser';

class ReadingOneScreen extends Component
{

	state = {
		reading: null,
		scriptures: []
	}

	UNSAFE_componentWillMount()
	{
		const reading = this.props.reading;

		const parser = new ScriptureTextParser(reading);

		//execute the sql queries to get the result.
		const sql = "select * from verses where book = ? AND verse >= ? AND verse <= ?";
		const params = [parser.book, parser.floatVerseStart, parser.floatVerseEnd];

		console.log(parser.book, parser.floatVerseStart, parser.floatVerseEnd);
		

		//perform the sql
		executeSQLQuery(sql, params)
			.then(result => {
				
				this.setState({scriptures: result});
				
			})
			.catch(error => {
				console.error(error);
				
			})
	}

	renderReadings()
	{
		
		return this.state.scriptures.map( verse => {
			let verseFloat = verse.verse;
			let verseNumber = String(verseFloat).split('.')[1];

			if( String(verseNumber).length === 2 )
				verseNumber = +verseNumber * 10;
			
			return (
				<Text key={verse.verse} style={styles.readingTextContent}>
					<Text style={{fontWeight: 'bold', fontSize: 19}}>{parseInt(verseNumber)} </Text> 
					{verse.unformatted} 
				</Text>
			)
		})
	}

	render(){
		
		const reading = this.props.reading;
		
		return (
			<View>
				<View style={ styles.readingTitleContainer }>
					<Text style={styles.readingTitleText}>
						{reading}
					</Text>
				</View>

				<View>
					<ScrollView style={{marginBottom: 100}}>
						<View style={styles.readingTextContainer}>
						{ this.renderReadings() }
						</View>
					</ScrollView>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	readingTitleContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 5,
		marginBottom: 10
	},

	readingTitleText: {
		fontSize: 25,
		fontWeight: 'bold',
		color: "#0101f7",
	},

	readingTextContent: {
		fontSize: 18,
		alignItems: "center",
		textAlign: 'justify',
		marginBottom: 10
	},

	readingTextContainer: {
		margin: 10,
		marginBottom: 20
	}
})

export default ReadingOneScreen;