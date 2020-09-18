import React, { Component } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import EchoItem from '../components/EchoItem';
import { colors } from '../config/Config';
import Spinner from '../components/Spinner';
import { Api } from '../config/Config';
import ProgressDialog from '../components/ProgressDialog';
import { executeSQLQuery } from '../utils/SQLUtil';
import { ItemTypes } from '../utils/ItemType';
import AsyncKeys from '../utils/AsyncKeys';

class EchoScreen extends Component {

	state = {
		isLoading: true,
		books: [],
		isDownloading: false,
		loadingText: "Downloading book....",
		purchasedEchos: [],
		purchasedEchoIds: [],
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
						+ ItemTypes.ECHO + "'";
        const params = [];

        executeSQLQuery(query, params)
            .then( rows => {

				let purchasedEchoIds = [];
				let purchasedEchos = [];

				rows.forEach( (item) => {
					purchasedEchos.push(item);
					purchasedEchoIds.push(item.purchase_item_id);

				});
				

				this.setState({
					purchasedEchoIds,
					purchasedEchos
				});

				//now load from the api... 
				axios.get(Api.presbyterianEchoUrl)
					.then( response => {
						this.setState({isLoading: false, books: response.data})
					})
					.catch( error => {
						Alert.alert(
							"Failed to Fetch",
							"Unfortunately an erorr has occured while fetching presbyterian echo maginzines."
							+ " Check your internet conenction!",
						);
						this.setState({isLoading: false})
						console.log(error);
						
					})
                
            } )
            .catch(error => {
				console.error(error);
				Alert.alert("Error!", "Could not load Presbyterian Echos");
                
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

	renderItem(item)
	{
		
		return <EchoItem 
					onDownloadStart = { this.onDownloadStart.bind(this) }
					onDownloadFinished = { this.onDownloadFinished.bind(this) }
					updateLoadingText={ this.updateLoadingText.bind(this) }
					purchasedEchoIds={this.state.purchasedEchoIds}
					purchasedEchos={this.state.purchasedEchos}
					user={this.state.user}
					item={item} />
	}

	updateLoadingText(text)
	{
		this.setState({loadingText: text});
	}

	render() {

		return (
			<View style={styles.containerStyle}>

				<Spinner text="Loading Presbyterian Echos....."
					visible={this.state.isLoading} />

				<ProgressDialog label = {this.state.loadingText}
					visible={this.state.isDownloading} />
				
				<Text style={styles.headingStyle}>Available Magazines</Text>

				<FlatList 
					data={this.state.books}
					keyExtractor={item => 'h_' + item.id}
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
export default EchoScreen;