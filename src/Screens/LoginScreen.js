import React, { Component } from "react";

import { Keyboard, Text, View, TouchableWithoutFeedback, 
		Alert, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Input, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";

import { colors, Api } from '../config/Config';
import ProgressDialog from '../components/ProgressDialog';
import AsyncKeys from '../utils/AsyncKeys';
import { saveReadings } from '../utils/SaveReadings';
import { saveUserPurchases } from '../utils/SaveUserPayments';

const appId = "1047121222092614"

export default class LoginScreen extends Component {

	state = {
		loading: false,
		tel: "673901939",
		password: "Cedric@2017",
		dialogText: "Logging user in..."
	}

	onRegisterPress(){
		Actions.Register();
	}

 	render() {
		return (
			<KeyboardAvoidingView style={styles.containerView} behavior="padding">

				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>

					<View style={styles.loginScreenContainer}>

						<ProgressDialog 
							visible={this.state.loading}
							label={this.state.dialogText}
							/>

						<View style={styles.loginFormView}>

							<Text style={styles.logoText}>Login</Text>
						
							<Input
								placeholder='6 77 66 66 15'
								label="Enter your phone number"
								value={this.state.tel}
								onChangeText={ text => this.setState({tel: text}) }
								leftIcon={
									<Icon
									name='call'
									size={24}
									color='black'
									/>
								}
							/>

							<Input
								placeholder='**********'
								label="Password"
								secureTextEntry
								value={this.state.password}
								onChangeText={text => this.setState({password: text})}
								leftIcon={
									<Icon
									name='lock'
									size={24}
									color='black'
									/>
								}
							/>

							<Button
								buttonStyle={styles.loginButton}
								onPress={() => this.onLoginPress()}
								title="Login"
								raised
								type="solid"
								/>

							<View style={styles.noAccountView}>
								<Text style={styles.noAccountText}>
									If you don't have an account,
								</Text>
							</View>
						
							<Button
								buttonStyle={styles.registerButton}
								titleStyle={styles.registerText}
								onPress={() => this.onRegisterPress()}
								title="Register"
								raised
								type="outline"
								/>
							
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		);
  	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}

	onLoginPress() {
		//get telephone number and the password..
		const { tel, password } = this.state;
		const app = this;
		
		// validate the form fields.
		if( tel === "" || password === "")
		{
			showMessage({
				message: "Please fill in all required form fields.",
				type: "danger",
				position: 'center'
			})
		}
		else{
			//start the login Process.. 
			this.setState({loading: true});

			const data = {
				email: tel,
				password: password
			};

			axios.post(Api.loginUrl, data)
				.then( response => {
					const data = response.data; 
					if(data.success)
					{
						//log the user in.. 
						const user = data.data;

						//save it to the async storage.
						AsyncStorage.setItem(AsyncKeys.userKey, JSON.stringify(user));

						Alert.alert(
							"Login Success!",
							"Welcome, " + user.name,
							[
								{
									text: 'OK', 
									onPress: () => {
										//sync the user data.
										//set the loader message
										app.setState({ dialogText: "Synchronising data" });
										app.syncData(user);
									} 
								}
							]
						)
					}
					else{
						//show the error message. 
						Alert.alert(
							"Login Error!",
							data.message
						);
						this.setState({loading: false});
					}

				})
				.catch( error => {

					Alert.alert(
						"Login Error!",
						"Please make sure you have a working internet connection"
					);
					this.setState({loading: false});
					console.log(error);
					
				} )
				
		}
	}

	async syncData(user){
		console.log("Syncing data");

		await this.syncReadings();

		//get the user purchases first. 
		const postData = {
			user_id: user.id
		};

		axios.post(Api.userPurchasesUrl, postData)
				.then( async response => {
					const data = response.data;
					const purchases = data.data;

					//save them to the database;
					await saveUserPurchases(purchases);

					this.setState({loading: false});
					Actions.Home()

				})
				.catch(error => {
					alert("Could not fetch user data");
					console.warn(error);
				})

	}

	async syncReadings(){
		const years = [2020, 2021, 2022];

		for(let i = 0; i < years.length; i++)
		{
			const year = years[i];

			//load the readings for each year.
			const readingUrl = Api.diaryReadingsUrl(year);

			const results = await axios.get(readingUrl);
			const readings = results.data;

			await saveReadings(readings);
		}

		console.log("Done saving readings");
	}
}

const styles = {
	containerView: {
		flex: 1,
	},

	loginScreenContainer: {
		flex: 1,
	},

	logoText: {
		fontSize: 30,
		fontWeight: "700",
		marginTop: 10,
		marginBottom: 30,
		textAlign: 'center',
		color: colors.primary
	},

	loginFormView: {
		flex: 1
	},

	loginButton: {
		backgroundColor: colors.primary,
		borderRadius: 5,
		height: 45,
		marginTop: 10,
		marginBottom: 1,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10
	},

	noAccountView: {
		marginTop: 10,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},

	noAccountText: {
		fontSize: 18,
		marginTop: 20,
		marginBottom: 5,
		fontWeight: 'bold'
	},

	registerButton: {
		marginLeft: 10,
		marginRight: 10,
		borderColor: colors.primary,
		color: "#fff"
	},

	registerText: {
		color: colors.primary,
		fontWeight: 'bold',
		fontSize: 18
	}

}