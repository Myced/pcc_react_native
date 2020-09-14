import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';


import { AppStyles } from '../utils/AppStyles';
import ProgressDialog from '../components/ProgressDialog';
import { colors } from '../config/Config';

class RegisterScreen extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			name: "",
			phone: "",
			email: "",
			password: ""
		};
	}

	componentDidMount() {
		
	}

	onRegisterPress = () => {
		const { email, password, name, phone } = this.state;
		
		if( password === "" || name === "" || phone === "" )
		{
			showMessage({
				message: "Please fill in all required form fields.",
				type: "danger",
				position: 'center'
			})
		}
		else {
			//validate the phone number. 
			const cleanPhone = phone.replace(/\s/g, '');
			
			//validate the length of the phone number 
			if(cleanPhone.length !== 9)
			{
				showMessage({
					message: "Phone number must be 9 digits",
					type: "danger",
					position: 'center'
				})
			}
			else{
				//register the user.
				this.setState({loading: true});

				//now register the user 
			}

		}
		
	};

	onLoginPress(){
		Actions.pop();
	}

	render() {
		return (

      		<View style={styles.container}>
				<ProgressDialog
					visible={this.state.loading}
					label="Registering user..."
					/>
				
				<View>
					<Text style={[styles.title, styles.leftTitle]}>Create new account</Text>
				</View>

				<View style={{  width: "90%"}}>
					<View style={styles.InputContainer}>

						<TextInput
							label="Full Names*"
							value={this.state.name}
							onChangeText={text => this.setState({name: text})}
							mode="outlined"
							/>
					</View>

					<View style={styles.InputContainer}>

						<TextInput
							label="Telephone *"
							value={this.state.phone}
							onChangeText={text => this.setState({phone: text})}
							placeholder="677 77 54 75"
							mode="outlined"
							/>
					</View>

					<View style={styles.InputContainer}>

						<TextInput
							label="Email"
							value={this.state.email}
							onChangeText={text => this.setState({email: text})}
							placeholder="example@email.com"
							mode="outlined"
							/>
					</View>

					<View style={styles.InputContainer}>

						<TextInput
							label="Password *"
							value={this.state.password}
							onChangeText={text => this.setState({password: text})}
							mode="outlined"
							secureTextEntry
						/>
					</View>


					<View style={{marginTop: 10, alignItems: 'center'}}>
						<Button
							buttonStyle={styles.registerButton}
							titleStyle={styles.registerTextStyle}
							onPress={() => this.onRegisterPress()}
							title="Register"
							raised
							type="solid"
							/>
					</View>

					<View style={styles.noAccountView}>
						<Text style={styles.noAccountText}>
							If you already have an account,
						</Text>
					</View>
					
					<View>
						<Button
							buttonStyle={styles.loginButton}
							titleStyle={styles.loginText}
							onPress={() => this.onLoginPress()}
							title="Login"
							raised
							type="outline"
							/>
					</View>

				</View>

      		</View>
    	);
  	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center"
	},
	title: {
		fontSize: AppStyles.fontSize.title,
		fontWeight: "bold",
		color: AppStyles.color.tint,
		marginTop: 20,
		marginBottom: 20
	},
	leftTitle: {
		alignSelf: "stretch",
		textAlign: "left",
		marginLeft: 20
	},
	content: {
		paddingLeft: 50,
		paddingRight: 50,
		textAlign: "center",
		fontSize: AppStyles.fontSize.content,
		color: AppStyles.color.text
	},
	
	
	InputContainer: {
		width: AppStyles.textInputWidth.main,
		marginTop: 10,
	},

	registerButton: {
		width: 100,
		backgroundColor: colors.primary,
		borderRadius: 5,
		marginTop: 10,
		marginBottom: 1,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10
	},

	registerTextStyle: {
		fontSize: 18
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

	loginButton: {
		borderColor: colors.primary,
	},

	loginText: {
		color: colors.primary,
		fontWeight: 'bold',
		fontSize: 18
	}
	
});

export default RegisterScreen;