import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { colors } from '../config/Config';

class CommunicationItemCard extends Component {

	renderRow1(data)
	{
		if( data !== null )
		{
			return (
				<Text style={ styles.rowStyle }>
					{data}
				</Text>
			)
		}
	}

	renderRow2(data)
	{
		if( data !== null )
		{
			return (
				<Text style={ styles.rowStyle }>
					{data}
				</Text>
			)
		}
	}

	renderRow3(data)
	{
		if( data !== null )
		{
			return (
				<Text style={ styles.rowStyle }>
					{data}
				</Text>
			)
		}
	}

	renderRow4(data)
	{
		if( data !== null )
		{
			return (
				<Text style={ styles.rowStyle }>
					{data}
				</Text>
			)
		}
	}

	renderRow5(data)
	{
		if( data !== null )
		{
			return (
				<Text style={ styles.rowStyle }>
					{data}
				</Text>
			)
		}
	}

	render() {
		
		const item = this.props.item.item;
		
        return (
			<View style={ styles.healthCard }>
				<Text style={ styles.titleStyle }>
					{item.name}
				</Text>
				{this.renderRow1(item.row1)}
				{this.renderRow2(item.row2)}
				{this.renderRow3(item.row3)}
				{this.renderRow4(item.row4)}
				{this.renderRow5(item.row5)}
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
		padding: 8,
		borderRadius: 3
	},

	titleStyle: {
		color: colors.primary,
		fontWeight: 'bold',
		fontSize: 18,
	},

	rowStyle: {
		marginTop: 4,
		marginBottom: 4,
		fontSize: 16
	}
}

export default CommunicationItemCard;