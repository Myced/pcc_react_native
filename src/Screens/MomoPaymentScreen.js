import React, { Component } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { decode, encode } from 'base-64';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import { TextInputMask } from 'react-native-masked-text'
import { showMessage } from 'react-native-flash-message';

import { momo } from '../utils/MomoPayer';
import { colors, MomoApi } from '../config/Config';
import ProgressDialog, {} from '../components/ProgressDialog';

class MomoPaymentScreen extends Component
{
	state = {
		telephone: '673901939',
		loading: false,
		label: "",
		momoToken: "",
		referenceId: null,
		momoTelephone: ""
	}

	UNSAFE_componentWillMount()
	{
		if (!global.btoa) {
			global.btoa = encode;
		}
			
		if (!global.atob) {
			global.atob = decode;
		}
	}

	performPayment()
	{
		//log makeing payment.
		const telephone = this.state.telephone;
		
		const tel = telephone.replace(/\s/g, '');

		const telValid = this.isValidateTel(tel);

		if( ! telValid )
		{
			showMessage({
				message: "Telephone number is invalid. Make sure its 9 digits",
				type: "danger",
				position: 'center',
				animated: true
			});

			return;
		}

		//valid telephone...a
		//proceed with MoMo Payment. 

		//generate a uuid code to use 
		const referenceId = uuidv4();
		const momoTelephone = "237" + tel;

		console.log(momoTelephone);

		this.setState({loading: true, label:"Making Momo Payment. \nDail *126# to authorise payment."});
		
		const tokenPromise = momo.getAccessToken();

		tokenPromise.then(data => {
					const token = data.access_token;
					
					this.setState({momoToken: token, referenceId, momoTelephone }, 
							this.makeMomoPayment(token, momoTelephone, referenceId)
						)
				})
				.catch(error => {

					const message = "Momo Payment Failed. Please check your internet connection"
					const title = "Payment Failure";

					Alert.alert(title, message);

					this.setState({loading: false});
				});
	
		
	}

	makeMomoPayment(token, momoTelephone, referenceId)
	{
		
		const request = {
			amount: "10",
			currency: "XAF",
			externalId: "569852145",
			payer: {
				partyIdType: "MSISDN",
				partyId: momoTelephone
			},
			payerMessage: "Please confirm payment for PCC App",
			payeeNote: ""
		}

		momo.requestToPay(referenceId, request, token)
			.then( response => console.log(response) )
			.catch( error => console.error( error) )
		
		
	}

	validatePayment()
	{

	}

	isValidateTel(tel)
	{
		if(isNaN(tel))
		{
			return false;
		}

		//now check the number of characters 
		if( tel.length !== 9 )
		{
			return false;
		}

		return true;
	}

	render(){
		
		return (
			<View style={styles.containerStyle}>
				
				<ProgressDialog
					label={this.state.label} 
					visible={this.state.loading}/>

				<View style={styles.imageView}>
					<Image style={styles.imageStyle} 
						source={ require('../../assets/momo.png') }/>
				</View>

				<View style={styles.amountView}>
					<Text style={styles.amountText}>
						Amount: 
						<Text style={{fontSize: 25}}> 1000 F</Text>
						
					</Text>
				</View>

				<View style={styles.inputView}>
					<TextInputMask
						placeholder="6 77 12 31 23"
						type={'custom'}
						style={styles.inputStyle}
						options={{
							mask: '9 99 99 99 99'
						}}
						value={this.state.telephone}
						onChangeText={text => {
							this.setState({
								telephone: text
							})
						}}
						/>
				</View>

				<View style={styles.payView}>
					<Button onPress={() => this.performPayment()}
						mode="contained"
						style={styles.payButton}
						labelStyle={styles.labelStyle}>
						PAY NOW
					</Button>
				</View>
			</View>
		)
	}
}

const styles = {
	containerStyle: {
		flex: 1,
	},

	imageView: {
		marginTop: 30,
		alignItems: 'center',
		textAlign: 'center'
	},

	imageStyle: {
		width: '80%',
		height: 160,
	},

	amountView: {
		alignItems: 'center',
		marginTop: 20
	},

	amountText: {
		fontSize: 18,
		fontWeight: 'bold'
	},

	inputView: {
		marginTop: 50,
		alignItems: 'center',
		textAlign: 'center',
	},

	inputStyle: {
		borderColor: 'gray',
		borderWidth: 2,
		padding: 5,
		textAlign: 'center',
		fontSize: 25,
		width: '90%'
	},

	payView: {
		alignItems: 'center',
	},

	payButton: {
		marginTop: 40,
		width: '90%',
	},
	
	labelStyle: {
		fontSize: 20,
	}
}

export default MomoPaymentScreen;