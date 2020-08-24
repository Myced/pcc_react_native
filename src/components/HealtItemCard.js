import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { colors } from '../config/Config';

class HealthItemCard extends Component {

	render() {
		
		const healthItem = this.props.item.item;
		
        return (
			<View style={ styles.healthCard }>
				<Text style={ styles.titleStyle }>
					{healthItem.name}
				</Text>
				<Text style={ styles.secretaryStyle }>
					{healthItem.doctor}
				</Text>
				<Text style={styles.otherStyle}>{ healthItem.pobox }</Text>
				<Text style={styles.otherStyle}>{ healthItem.address }</Text>
				<Text style={styles.otherStyle}>{ healthItem.tel }</Text>
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
		fontSize: 16,
		fontWeight: 'bold',
		marginTop: 4,
		marginBottom: 2
	},

	otherStyle: {
		marginTop: 4,
		marginBottom: 4,
	}
}

export default HealthItemCard;