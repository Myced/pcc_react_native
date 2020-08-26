import React, { Component } from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';

class ReadingPsalmsScreen extends Component
{
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

export default ReadingPsalmsScreen;