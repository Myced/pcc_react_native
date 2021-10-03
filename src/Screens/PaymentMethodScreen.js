import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Title, Button } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';

import { colors } from '../config/Config';

class PaymentMethodScreen extends Component
{
	state = {
		title: "",
		amount: 0,
		user: null,
		year: null,
		itemType: null,
		itemcode: null,
	}

	UNSAFE_componentWillMount()
	{
		const title = this.props.title;
		const amount = this.props.amount;
		const user = this.props.user;
		const year = this.props.year;
		const itemType = this.props.itemType;
		const itemCode = this.props.itemCode;

		this.setState({title, amount, user, year, itemType, itemCode});
	}

	goToMomoPayment()
	{
		const data = {
			title: this.state.title,
			amount: this.state.amount,
			user: this.state.user,
			year: this.state.year,
			itemType: this.state.itemType,
			itemCode: this.state.itemCode
		}

		Actions.momoPayment(data);
	}
	render(){
		return (
			<View style={styles.containerStyle}>
				<ScrollView>
					<View style={styles.viewStyle}>
						<Title>Payment for:</Title>
						<Text style={styles.itemStyle} >
							{ this.state.title }
						</Text>
					</View>

					<View style={styles.viewStyle}>
						<Title>Amount:</Title>
						<Text style={styles.itemStyle} >{ this.state.amount } FCFA</Text>
					</View>

					<View style={styles.viewStyle}>
						<Title style={{marginTop: 20}}>Choose Your Payment Method</Title>
					</View>

					<View style={styles.viewStyle}>
						<Button onPress={ () => this.goToMomoPayment()}
							mode="contained"
							style={styles.momoButton}
							labelStyle={styles.labelStyle}>
							MTN Mobile Money
						</Button>

						<Button onPress={() => alert("Support Coming Soon... Stay tuned")}
							mode="contained"
							style={styles.orangeButton}
							labelStyle={styles.labelStyle}>
							ORANGE Money
						</Button>
					</View>
				</ScrollView>
			</View>
		)
	}
}

const styles = {
	containerStyle: {
		flex: 1
	},

	viewStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
	},

	itemStyle: {
		color: colors.primary,
		fontWeight: 'bold',
		fontSize: 28,
		textAlign: 'center',
	},

	momoButton: {
		backgroundColor: "#fc0",
		width: '70%',
		marginTop: 50,
	},

	labelStyle: {
		fontSize: 18
	},

	orangeButton: {
		backgroundColor: "#f16e00",
		width: '70%',
		marginTop: 20
	}
};

export default PaymentMethodScreen;