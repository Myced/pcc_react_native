import React, { Component } from "react";

import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Input, Button } from 'react-native-elements';

import { colors } from '../config/Config';

const appId = "1047121222092614"

export default class LoginScreen extends Component {

  render() {
    return (
      	<KeyboardAvoidingView style={styles.containerView} behavior="padding">

			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.loginScreenContainer}>
					<View style={styles.loginFormView}>

						<Text style={styles.logoText}>Login</Text>
					
						<Input
							placeholder='6 77 66 66 15'
							label="Enter your phone number"
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
							onPress={() => this.onLoginPress()}
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

  }

  async onFbLoginPress() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(appId, {
      permissions: ['public_profile', 'email'],
    });
    if (type === 'success') {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
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
		maringTop: 10,
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
		textColor: "#fff"
	},

	registerText: {
		color: colors.primary,
		fontWeight: 'bold',
		fontSize: 18
	}

}