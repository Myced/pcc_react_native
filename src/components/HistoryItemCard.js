import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { colors } from '../config/Config';

class HistoryItemCard extends Component {

	renderName(name)
	{
		if( name !== null )
		{
			return (
				<Text style={ styles.titleStyle }>
					{name}
				</Text>
			)
		}
	}

	renderRowChair(data)
	{
		if( data !== null )
		{
			return (
				<Text style={ styles.principalStyle }>
					{data}
				</Text>
			)
		}
	}

	renderPOBox(data)
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

	renderAddress(data)
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

	renderTel(data)
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

	renderEmail(data)
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
		
		const item = this.props.item;
		
        return (
			<View style={ styles.card }>
				{this.renderName(item.name)}
				{this.renderRowChair(item.chair_person)}
				{this.renderPOBox(item.pobox)}
				{this.renderAddress(item.address)}
				{this.renderTel(item.tel)}
				{this.renderEmail(item.email)}
			</View>
        )
    }
}

const styles = {
	card: {
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
	},

	principalStyle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginTop: 4,
		marginBottom: 2
	}
}

export default HistoryItemCard;