import React, { Component } from 'react';
import { Button, Card, Title } from 'react-native-paper';

class MessengerItem extends Component {

	render()
	{
		const { item } = this.props.item;

		return (
			<Card elevation={5} style={styles.cardStyle}>
				<Card.Content>
					<Title>{ item.title }</Title>
				</Card.Content>

				<Card.Actions style={styles.cardActionStyle}>
					<Button onPress={() => alert("ok")} >Buy</Button>
					<Button onPress={() => alert("ok")} >Download</Button>
				</Card.Actions>
			</Card>
		)
	}
}

const styles = {
	cardStyle: {
		marginTop: 5,
	},

	cardActionStyle: {
		alignItems: 'flex-end',
		color: 'red',
		flexDirection: 'row',
	}
}

export default MessengerItem;