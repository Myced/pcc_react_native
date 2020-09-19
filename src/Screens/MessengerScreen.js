import React, { Component } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import MessengerItem from '../components/MessengerItem';
import { colors } from '../config/Config';
import Spinner from '../components/Spinner';
import { Api } from '../config/Config';
import ProgressDialog from '../components/ProgressDialog';
import { executeSQLQuery } from '../utils/SQLUtil';
import { ItemTypes } from '../utils/ItemType';
import AsyncKeys from '../utils/AsyncKeys';

class MessengerScreen extends Component {

	state = {
		isLoading: true,
		books: [],
		isDownloading: false,
		loadingText: "Downloading book....",
		purchasedMessengers: [],
		purchasedMessengerIds: [],
		user: null,
	}
	
	onDownloadStart()
	{
		this.setState({isDownloading: true})
	}

	onDownloadFinished()
	{
		this.setState({isDownloading: false})
	}

	UNSAFE_componentWillMount()
	{
		//fetch the books from the api. 

		//first fetch the purchased echos.. 
		const query = "SELECT * FROM `purchases` WHERE item_type = '" 
						+ ItemTypes.MESSENGER + "'";
        const params = [];

        executeSQLQuery(query, params)
            .then( rows => {

				let purchasedMessengerIds = [];
				let purchasedMessengers = [];

				rows.forEach( (item) => {
					purchasedMessengers.push(item);
					purchasedMessengerIds.push(item.purchase_item_id);

				});
				

				this.setState({
					purchasedMessengerIds,
					purchasedMessengers
				});

				//now load from the api... 
				axios.get(Api.theMessengerUrl)
					.then( response => {
						this.setState({isLoading: false, books: response.data})
					})
					.catch( error => {
						Alert.alert(
							"Failed to Fetch",
							"Unfortunately an erorr has occured while fetching The Messenger maginzines."
							+ " Check your internet conenction!",
						);
						this.setState({isLoading: false})
						console.log(error);
						
					})
                
            } )
            .catch(error => {
				console.error(error);
				Alert.alert("Error!", "Could not load The Messengers ");
                
            })
		
		this.fetchUser();
		
	}

	fetchUser()
	{
		//get the currently logged in user 
        const UserPromise = AsyncStorage.getItem(AsyncKeys.userKey);

        UserPromise.then( user => {
            const finalUser = JSON.parse(user);
            this.setState({user: finalUser});
        } )
        .catch ( error => console.error(error) );
	}

	updateLoadingText(text)
	{
		this.setState({loadingText: text});
	}

	renderItem(item)
	{
		return <MessengerItem 
					onDownloadStart = { this.onDownloadStart.bind(this) }
					onDownloadFinished = {  this.onDownloadFinished.bind(this) }
					updateLoadingText={ this.updateLoadingText.bind(this) }
					purchasedMessengerIds={this.state.purchasedMessengerIds}
					purchasedMessengers={this.state.purchasedMessengers}
					user={this.state.user}
					item={item} />
	}

	render() {

		return (
			<View style={styles.containerStyle}>

				<Spinner text="Loading Messengers....."
					visible={this.state.isLoading} />

				<ProgressDialog label = {this.state.loadingText}
					visible={this.state.isDownloading} />
				
				<Text style={styles.headingStyle}>Available Messengers</Text>

				<FlatList 
					data={this.state.books}
					keyExtractor={item => "m_" + item.id}
					renderItem={this.renderItem.bind(this)}
					/>
			</View>
		)
	}
}

const styles = {
	containerStyle: {
		padding: 5,
		backgroundColor: colors.background,
		flex: 1
	},

	headingStyle: {
		color: colors.primary,
		fontSize: 20,
		fontWeight: 'bold',
		borderBottomColor: colors.primary,
		borderBottomWidth: 2,
		marginTop: 2,
		marginBottom: 4,
	}
}

export default MessengerScreen;