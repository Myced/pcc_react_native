import React, { Component } from 'react';
import {View, Text, TouchableOpacity } from 'react-native';

class BooksScreen extends Component {
    render() {
        return (
			<View style={styles.containerStyles}>

				<TouchableOpacity>
					<View style={styles.bookStyle}>
						<Text style={styles.textStyle}>
							PRESBYTERIAN ECHO
						</Text>
					</View>	
				</TouchableOpacity>
				

				<TouchableOpacity>
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