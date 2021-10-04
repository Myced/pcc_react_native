import React, { Component } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { decode, encode } from 'base-64';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import { TextInputMask } from 'react-native-masked-text'
import { showMessage } from 'react-native-flash-message';

import { momo } from '../utils/MomoPayer';
import PaymentStatus from '../utils/PaymentStatus';
import MomoFailureReason from '../utils/MomoFailureReasons';
import ProgressDialog, {} from '../components/ProgressDialog';
import { ItemTypes } from '../utils/ItemType';
import { Api } from '../config/Config';
import { executeSQLQuery } from '../utils/SQLUtil';
import { Actions } from 'react-native-router-flux';

class MomoPaymentScreen extends Component
{
	state = {
		telephone: '',
		loading: false,
		label: "",
		momoToken: "",
		referenceId: null,
		momoTelephone: "",
		user: null,
		title: '',
		amount: 0,
		year: null,
		itemType: null,
		itemCode: null,
		paymentStatus: null,
		paymentMessage: ""
	}

	UNSAFE_componentWillMount()
	{
		if (!global.btoa) {
			global.btoa = encode;
		}
			
		if (!global.atob) {
			global.atob = decode;
		}

		//set the telephone number from the user 
		const telephone = this.props.user.tel;
		const user = this.props.user;
		const year = this.props.year;
		const title = this.props.title;
		const amount = this.props.amount;
		const itemType = this.props.itemType;
		const itemCode = this.props.itemCode;

		this.setState({
			telephone, user, year, title, amount, itemType, itemCode
		});


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

		this.setState({loading: true, label:"Initiating Momo Payment..."});
		
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
			amount: this.state.amount,
			currency: "XAF",
			externalId: "569852145",
			payer: {
				partyIdType: "MSISDN",
				partyId: momoTelephone
			},
			payerMessage: "Please confirm payment for PCC App",
			payeeNote: ""
		}

		const app = this;

		momo.requestToPay(referenceId, request, token)
			.then( response => {
				// a whole lot of actions to be taken here.
				this.setState({ 
					label:"Making Momo Payment. \nDail *126# to authorise payment.",
					paymentStatus: PaymentStatus.PENDING
				});
				
				//so far the request is ok..
				//now we need to check the status of the transaction every 5 seconds to get the state.
				//do this while the state of the transaction is not pending.
				
				app.validatePayment();
				

			} )
			.catch( error => {
				console.error( error)
			} )
		
		
	}

	validatePayment()
	{
		// this.setState({loading: false})
		const app = this;

		const token = this.state.momoToken;
		const referenceId = this.state.referenceId;

		//save the transaction details to the database. 

		const interval = setInterval( () => {

			momo.checkPaymentStatus(referenceId, token)
				.then( response => {
					const result = response.data;

					console.log(result);

					if( result.status === PaymentStatus.FAILED )
					{
						const failureReason = result.reason;

						this.setState({loading: false})

						if(failureReason === MomoFailureReason.INSUFFICIENT_AMOUNT)
						{
							const message = "You do not have a sufficient balance in your account.\n\nPlease Recharge."
							const title = "Payment Failure";

							Alert.alert(title, message);
						}
						else if ( failureReason === MomoFailureReason.REJECTED )
						{
							const message = "Your payment was rejected!"
							const title = "Payment Failure";

							Alert.alert(title, message);
						}
						else {
							const message = "Payment failed with error message.\n\n" + failureReason;
							const title = "Payment Failure";

							Alert.alert(title, message);
						}

						//stop the intervarls. 
						clearInterval(interval);
						
					}

					//status where the payment was rejected. 
					if( result.status === PaymentStatus.REJECTED )
					{
						const failureReason = result.reason;

						this.setState({loading: false})

						const message = "You rejected the payment.";
						const title = "Payment Rejected";

						Alert.alert(title, message);

						//stop the intervarls. 
						clearInterval(interval);
						
					}

					//if the payment is successful. 
					if(result.status === PaymentStatus.SUCCESS)
					{
						this.setState({loading: false, paymentStatus: true, paymentMessage: "success"})

						const message = "Your payment was successful!";
						const title = "Payment Successful";

						// Alert.alert(title, message);
						showMessage({
							message: message,
							type: "success",
							position: 'top',
							animated: true
						});

						clearInterval(interval);

						//now do the after the payment..
						app.afterPaymentSuccess();

					}

					//continue to check the payment.

				})
				.catch(error => console.error(error));

		}, 5000 );

		
	}

	afterPaymentSuccess()
	{
		//get the item code. 
		const app = this;
		const user = this.state.user;
		const itemType = this.state.itemType;
		const itemCost = this.state.amount;
		const diaryYear = this.state.year;

		//first save the item to the online store.

		//update the loading state of the application 
		const loadingText = "Saving your purchase...";
		this.setState({loading: true, label: loadingText});

		const purchaseItemPromise = this.getPurchaseItem();
		purchaseItemPromise
			.then( response => {
				const purchaseItem = response.data.data;

				if( purchaseItem === null )
				{
					//serious problem.....
					//the payment has been made to an item that does not exist.
					console.log("we are stuck here");
					//TODO: show error codes corresponding to each error type.
				}
				else{

					//now add the purchase to the clients purchases account .
					const purchaseData = {
						user_id: user.id,
						purchase_item_id: purchaseItem.id,
						item_name: purchaseItem.name,
						item_type: itemType,
						customer_name: user.name,
						customer_tel: user.tel,
						amount: itemCost
					};

					//now save this to the cloud.
					axios
						.post(Api.addPurchaseItemUrl, purchaseData)
							.then ( response  => {
								const purchaseItemData = response.data.data;
								
								const params = [
									purchaseItemData.id,
									purchaseItemData.user_id,
									purchaseItemData.purchase_item_id,
									purchaseItemData.item_name,
									purchaseItemData.customer_name,
									purchaseItemData.customer_tel,
									diaryYear,
									purchaseItemData.amount,
									purchaseItemData.item_type,
									purchaseItemData.created_at,
								];

								//save it to the database.... 
								let sql = "INSERT INTO `purchases` "
									+ " (`remote_id`, `user_id`, `purchase_item_id`, `item_name`,"
									+ " `customer_name`, `customer_tel`, `diary_year`, `amount`, "
									+ " `item_type`, `created_at` ) "
									+ "  VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) ";
								
								//peform the sql query 
								executeSQLQuery(sql, params)
									.then( result => {

										// Alert.alert("Success", purchaseItemData.item_name + " purchased successfully");
										const message = purchaseItemData.item_name + " purchased successfully";
										showMessage({
											message: message,
											type: "success",
											position: 'top',
											animated: true
										});

										this.setState({ loading: false});

										app.returnToPage();
									} )
									.catch( error => {
										
										console.log(error);
										Alert.alert("Error!", "Failed to save item purchased");
										this.setState({loading: false});
									})
								
							})
							.catch( error => {
								console.log(error);
								this.setState({loading: false});
								Alert.alert("Error", "Failed Purchasing Item");
							})

				}

				this.setState({loading: false})
				
			})
			.catch( error => console.error(error));

		///then redirect to the appropriate page.
	}

	async getPurchaseItem()
	{
		const itemCode = this.state.itemCode;

		const url = Api.getPurchaseItemUrl(itemCode);

		//now get the item data 
		const purchaseItemPromise = await axios.get(url);

		return purchaseItemPromise;
	}

	//now redirect the user to the right place. 
	returnToPage()
	{
		const itemType = this.state.itemType;

		Actions.reset('root');

		if(itemType === ItemTypes.DIARY)
		{	
			Actions.Diary();
			return ;
		}
		else if( itemType === ItemTypes.HYMN)
		{
			Actions.Hymn();
			return ;
		}
		else if ( itemType === ItemTypes.ECHO )
		{
			Actions.echo();

			return;
		}
		else if ( itemType === ItemTypes.MESSENGER )
		{
			Actions.messenger();
			return ;
		}

		// console.log("At this level");
		Actions.Home();
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
						<Text style={{fontSize: 25}}> {this.state.amount} F</Text>
						
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
					{/* <Button onPress={() => this.returnToPage()}
						mode="contained"
						style={styles.payButton}
						labelStyle={styles.labelStyle}>
						PAY NOW
					</Button> */}
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