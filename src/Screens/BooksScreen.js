import React, { Component } from 'react';
import {View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

class BooksScreen extends Component {

	openMessengerScreen()
	{
		Actions.messenger();
	}

	openEchoScreen()
	{
		Actions.echo();
	}

    render() {
        return (
			<View style={styles.containerStyles}>

				<TouchableOpacity onPress={ () => this.openEchoScreen() }>
					<View style={styles.bookStyle}>
						<Text style={styles.textStyle}>
							PRESBYTERIAN ECHO
						</Text>
					</View>	
				</TouchableOpacity>
				

				<TouchableOpacity onPress={ () => this.openMessengerScreen() }>
					<View style={[styles.bookStyle, styles.messengerStyle]}>
						<Text style={styles.textStyle}>
							THE MESSENGER
						</Text>
					</View>
				</TouchableOpacity>

			</View>
        )
    }
}

const styles = {
	containerStyles: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	bookStyle: {
		backgroundColor: 'red',
		width: 300,
		height: 100,
		textColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-around',
		borderRadius: 20,
	},

	textStyle: {
		color: '#fff',
		fontSize: 20,
	},

	messengerStyle: {
		marginTop: 10
	}
}

export default BooksScreen;