import React, { Component } from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

class ReadingOneScreen extends Component
{
	render(){
		return (
			<View>
				<View style={ styles.readingTitleContainer }>
					<Text style={styles.readingTitleText}>
						Matt. 5: 1 - 5
					</Text>
				</View>

				<View>
					<ScrollView>
						<Text>
							Readings.
						</Text>
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
		fontSize: 30,
		fontWeight: 'bold',
		color: "#0101f7",
	}
})

export default ReadingOneScreen;