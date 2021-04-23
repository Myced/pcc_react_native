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
		telephone: '123456789',
		loading: false,
		label: "",
		momoToken: "",
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

		console.log("Getting Access Token");
		this.setState({loading: true, label:"Making Momo Payment. \nDail *126# to authorise payment."});
		
		const tokenPromise = momo.getAccessToken();
		tokenPromise.then(data => {
					const token = data.access_token;
					
					this.setState({momoToken: token}, this.makeMomoPayment(token))
				})
				.catch(error => {
					const message = "Momo Payment Failed. Please check your internet connection"
					const title = "Payment Failure";

					Alert.alert(title, message);

					this.setState({loading: false});
				});
	
		
	}

	makeMomoPayment(token)
	{
		console.log("Making request for RequestToPay");
		console.log(token);
		
		const tel = "237673901939";
		
		//generate a uuid code to use 
		const referenceId = uuidv4();
		console.log(uuidv4());
		

		const request = {
			amount: "50",
			currency: "EUR",
			externalId: "123456",
			payer: {
				partyIdType: "MSISDN",
				partyId: "237673901939"
			},
			payerMessage: "Please confirm payment for PCC App",
			payeeNote: ""
		}

		console.log(request);
		
		console.log("making momo payment");

		momo.requestToPay(referenceId, {}, token)
			.then( response => console.log(response) )
			.catch( error => console.error( error.response.request._response ) )
		
		
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
		// const token = "";

		var data = JSON.stringify({"amount":"1000","currency":"EUR","externalId":"2019652365","payer":{"partyIdType":"MSISDN","partyId":"46733123453"},"payerMessage":"Application Payment","payeeNote":"Test Payment"});

var config = {
  method: 'post',
  url: 'https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay',
  headers: { 
    'X-Reference-Id': '0c1aa3d4-caac-4199-827c-c77ded0634c5', 
    'X-Target-Environment': 'sandbox', 
    'Ocp-Apim-Subscription-Key': 'fd9316ce2bfd4aef80dc4357189c48a9', 
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6ImY0YWE2ODgxLTQxOTAtNGVmMS04NzU5LWMyZGQ0NDIzYTk5ZSIsImV4cGlyZXMiOiIyMDIxLTAxLTIzVDE2OjE1OjM5LjYwNyIsInNlc3Npb25JZCI6IjFmYzE4MjVlLWMwYTEtNGQxZi1hZTM5LTQzNmUwMjdiMTgwNCJ9.PDclQ6hv2OmkFBydGu95lNdYXFoH7j36kwqdHvCoa491AmIicvojT6qteA0zYvv_6t_ldGTds6yhrn_EEfl10kXE_IIG1cFnH_Eql0hdMvHw9enGK_3M9dJt73664FxmYOB1tjYONTF-eGmxdPpx57URkMUbOVldiow2CGcSOcPp_mjTZLP4vnihlozB8XtxgwTT2K_cDsJExURfx601g8ILbkcE_t_88oLZjhkuJtDNiT-drivDBjdKRP9YnqsKeu8pw4PI7hMPR-Ptot2j1u8i_9LZJKxmS6YvkxL5_3Ip1aO0VsoWlFFPCZCBGK_YltDX5jOFHbZJlnrpVz8-gA', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.error(error);
});
		
		
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