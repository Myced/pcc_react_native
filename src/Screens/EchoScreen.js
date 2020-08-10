import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';

import EchoItem from '../components/EchoItem';
import { colors } from '../config/Config';
import EchoData from '../dataTest/EchoTestData';

class EchoScreen extends Component {

	renderItem(item)
	{
		return <EchoItem item={item} />
	}

	render() {

		return (
			<View style={styles.containerStyle}>
				
				<Text style={styles.headingStyle}>Available Magazines</Text>

				<FlatList 
					data={EchoData}
					keyExtractor={item => item.id}
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
export default EchoScreen;