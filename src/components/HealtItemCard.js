import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { colors } from '../config/Config';

class HealthItemCard extends Component {

	render() {
		
		const healthItem = this.props.item;
		
        return (
			<View style={ styles.healthCard }>
				<Text style={ styles.titleStyle }>Title</Text>
				<Text style={ styles.secretaryStyle }>Secretary</Text>
				<Text>Po Box</Text>
				<Text>Tel</Text>
				<Text>email</Text>
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
		fontSize: 20,
	},

	secretaryStyle: {
		fontSize: 16,
		fontWeight: 'bold',
	}
}

export default HealthItemCard;