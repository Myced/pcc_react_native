import React, { Component } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import axios from 'axios';

import EchoItem from '../components/EchoItem';
import { colors } from '../config/Config';
import Spinner from '../components/Spinner';
import { Api } from '../config/Config';
import ProgressDialog from '../components/ProgressDialog';

class EchoScreen extends Component {

	state = {
		isLoading: true,
		books: [],
		isDownloading: false
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
		
		axios.get(Api.presbyterianEchoUrl)
			.then( response => {
				this.setState({isLoading: false, books: response.data})
			} )
			.catch( error => {
				Alert.alert(
					"Failed to Fetch",
					"Unfortunately an erorr has occured while fetching presbyterian echo maginzines."
					+ " Check your internet conenction!",
				);
				this.setState({isLoading: false})
				console.log(error);
				
			} )
	}

	renderItem(item)
	{
		
		return <EchoItem 
					onDownloadStart = { this.onDownloadStart.bind(this) }
					onDownloadFinished = { this.onDownloadFinished.bind(this) }
					item={item} />
	}

	render() {

		return (
			<View style={styles.containerStyle}>

				<Spinner text="Loading Presbyterian Echos"
					visible={this.state.isLoading} />

				<ProgressDialog label = "Donwloading Book"
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