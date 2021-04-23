import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';

import { colors } from '../config/Config';

class RetiredPastorsCard extends Component {

	renderItem(item)
	{
		const pastor = item.item;
		return <Text style={styles.pastorStyle}>{pastor.count} { pastor.name }</Text>
	}

	render() {
		const presbytery = this.props.item.item;
		
        return (
			<View style={ styles.healthCard }>
				<Text style={ styles.titleStyle }>
					{presbytery.name}
				</Text>
				<FlatList 
					keyExtractor= { (item) => "item_" + item.id }
					data={presbytery.items}
					renderItem={this.renderItem}
					/>
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

	pastorStyle: {
		backgroundColor: "#ccc",
		fontSize: 17,
		padding: 5,
	}

}

export default RetiredPastorsCard;