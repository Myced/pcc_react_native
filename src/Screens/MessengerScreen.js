import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';

import MessengerItem from '../components/MessengerItem';
import MessengerData from '../dataTest/MessengerTestData';
import { colors } from '../config/Config';

class MessengerScreen extends Component {
	renderItem(item)
	{
		return <MessengerItem item={item} />
	}

	render() {

		return (
			<View style={styles.containerStyle}>
				
				<Text style={styles.headingStyle}>Available Messengers</Text>

				<FlatList 
					data={MessengerData}
					keyExtractor={item => "m_" + item.id}
					renderItem={this.renderItem}
					/>
			</View>
		)
	}
}

const styles = {
	containerStyle: {
		padding: 5,
		backgroundColor: colors.background,
		flex: 1
	},

	headingStyle: {
		color: colors.primary,
		fontSize: 20,
		fontWeight: 'bold',
		borderBottomColor: colors.primary,
		borderBottomWidth: 2,
		marginTop: 2,
		marginBottom: 4,
	}
}

export default MessengerScreen;