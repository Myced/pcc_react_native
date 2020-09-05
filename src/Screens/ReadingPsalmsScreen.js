import React, { Component } from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';

import { executeSQLQuery } from '../utils/SQLUtil';
import ScriptureTextParser from '../utils/ScriptureTextParser';
import CompoundScriptureParser from '../utils/CompoundScriptureParser';
import { colors } from '../config/Config';

class ReadingPsalmsScreen extends Component
{
	state = {
		reading: null,
		scriptures: []
	}


	UNSAFE_componentWillMount()
	{
		const reading = this.props.reading;

		if(this.isCompountReading(reading))
		{
			this.parseCompountScripture(reading);
		}
		else{
			this.parseSimpleScripture(reading);
		}

	}

	parseSimpleScripture(reading)
	{
		const parser = new ScriptureTextParser(reading);

		//execute the sql queries to get the result.
		const sql = "select * from verses where book = ? AND verse >= ? AND verse <= ?";
		const params = [parser.book, parser.floatVerseStart, parser.floatVerseEnd];

		//perform the sql
		executeSQLQuery(sql, params)
			.then(result => {

				let currentreading = {
					type: 'readings',
					title: reading,
					content: result
				};
				
				this.setState({scriptures: [...this.state.scriptures, currentreading]});
				
			})
			.catch(error => {
				console.error(error);
				
			})
	}

	parseCompountScripture(reading)
	{
		const parser = new CompoundScriptureParser(reading);

		const params = parser.queryParams;
		
		params.forEach( param => {

			//get the query result 
			const sql = "select * from verses where book = ? AND verse >= ? AND verse <= ?";
			const parameters = param.params;

			//perform the sql
			executeSQLQuery(sql, parameters)
				.then(result => {

					let currentreading = {
						type: 'readings',
						title: param.reading,
						content: result
					};

					let title = {
						type: 'title',
						title: param.reading,
						content: [],
					}
					
					this.setState({scriptures: [...this.state.scriptures, title, currentreading]});
					
				})
				.catch(error => {
					console.error(error);
					
				})

		} );
	}

	isCompountReading(reading)
	{
		if(reading.includes("&"))
			return true;

		return false;
	}

	renderReadings()
	{
		
		return this.state.scriptures.map( (row, index) => {

			if(row.type === "title")
			{
				return (
					<Text key={"h_" + index} style={styles.textTitleStyle}>{row.title}</Text>
				)
			}
			else{

				return row.content.map((verse) => {
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
	},

	textTitleStyle:{
		fontSize: 20,
		color: colors.primary,
		fontWeight: 'bold',
		marginBottom: 5,
		marginTop: 10
	}
})

export default ReadingPsalmsScreen;