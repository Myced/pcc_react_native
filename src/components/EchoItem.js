import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Button, Card, Title } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import { showMessage, hideMessage } from "react-native-flash-message";
import axios from 'axios';

import { ItemTypes, getItemCost } from '../utils/ItemType';
import { Api } from '../config/Config';
import { executeSQLQuery } from '../utils/SQLUtil';

class EchoItem extends Component {

	state = {
		purchasedItem: null,
		isDownloaded: false,
		isBought: false,
		fileUrl: "",
		user: null,
	}

	UNSAFE_componentWillMount()
	{
		var purchasedItem = null;

		const purchasedEchos = this.props.purchasedEchos;
		const purchasedEchoIds = this.props.purchasedEchoIds;
		const item = this.props.item.item;
		const user = this.props.user;
		

		for (let i = 0; i < purchasedEchos.length; i++) {

			const echo = purchasedEchos[i];	
			
			if( echo.purchase_item_id == item.purchase_item_id )
			{
				purchasedItem = echo;
				
			}
			
		}
		

		let isDownloaded = false;
		let isBought = false;
		let fileUrl = "";
		
		if(purchasedItem !== null)
		{
			//then check if it has been downloaded.... 
			if(purchasedItem.file_url === null || purchasedItem.file_url == "")
			{
				isDownloaded = false;
			}
			else{
				isDownloaded = true;
				fileUrl = purchasedItem.file_url;
			}

			isBought = true;

			this.setState({
				isBought, isDownloaded, purchasedItem, user
			});
		}

		this.setState({purchasedItem, user})

		//get the user too 

	}

	openBook()
	{
		alert("opinging");
	}

	buyItem(item)
	{
		const user = this.state.user;

		const purchaseData = {
			user_id: user.id,
			purchase_item_id: item.purchase_item_id,
			item_name: item.name,
			item_type: ItemTypes.ECHO,
			customer_name: user.name,
			customer_tel: user.tel,
			amount: getItemCost(ItemTypes.ECHO)
		};
		

		//make a request to save it.. 
		const loadingText = "Purchasing Item...";
		this.props.updateLoadingText(loadingText);
		this.props.onDownloadStart();

		//make the http request 
		axios.post(Api.itemPurchaseUrl, purchaseData)
			.then ( response  => {
				const purchaseItemData = response.data.data;
				
				const params = [
					purchaseItemData.id,
					purchaseItemData.user_id,
					purchaseItemData.purchase_item_id,
					purchaseItemData.item_name,
					purchaseItemData.customer_name,
					purchaseItemData.customer_tel,
					purchaseItemData.amount,
					purchaseItemData.item_type,
					purchaseItemData.created_at,
				];

				//save it to the database.... 
				let sql = "INSERT INTO `purchases` "
					+ " (`remote_id`, `user_id`, `purchase_item_id`, `item_name`,"
					+ " `customer_name`, `customer_tel`, `amount`, `item_type`, "
					+ " `created_at` ) "
					+ "  VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? ) ";
				
				//peform the sql query 
				executeSQLQuery(sql, params)
					.then( result => {
						
						this.savePurchaseToState();

						Alert.alert("Success", purchaseItemData.item_name + " purchased successfully");
						
						this.props.onDownloadFinished();
						this.setState({ isBought: true });
					} )
					.catch( error => {
						
						this.props.onDownloadFinished();
						console.log(error);
						Alert.alert("Error!", "Failed to save item purchased");
					} )
				
			})
			.catch( error => {
				console.log(error);
				this.props.onDownloadFinished();
				Alert.alert("Error", "Failed Purchasing Item");
			} )

	}

	savePurchaseToState()
	{
		const sql = "SELECT * FROM `purchases` WHERE `purchase_item_id` = ?";
		const params = [this.props.item.item.purchase_item_id];

		executeSQLQuery(sql, params)
			.then( rows => {

				const currentPurchase = rows[0];
				this.setState({purchasedItem: currentPurchase});
				
			} )
			.catch( error => {
				Alert.alert("Error", "Error getting currently purchased item.");
				console.log(error);
				
			} )
	}

	downloadItem(item)
	{
		const fileUrl = item.url;
		const filename = item.code + ".pdf";

		this.props.updateLoadingText("Downloading book...");
		this.props.onDownloadStart();

		this.checkIfFolderExists(fileUrl, filename);
		
	}

	checkIfFolderExists(fileUrl, filename)
	{
		const folder = `${FileSystem.documentDirectory}books/echos/`;

		FileSystem.getInfoAsync(folder, {})
            .then((fileObject) => {
                //check if the file exists 
                if(fileObject.exists)
                {
					this.downloadBook(fileUrl, filename)
                }
                else {

					this.createFileDirectory(fileUrl, filename);
					
                }
            })
            .catch( error => {
                console.log(error)
            });
	}

	createFileDirectory(fileUrl, filename)
	{
		const fileUri = `${FileSystem.documentDirectory}books/echos/`;

        const options = {
            intermediates: true,
        };

        FileSystem.makeDirectoryAsync(fileUri, options)
            .then(() => {
				console.log("Folder Created");
				
				this.downloadBook(fileUrl, filename);
            })
            .catch((error) => {
				console.log(error)
				this.props.onDownloadFinished();
			})
	}

	downloadBook(fileUrl, filename)
	{
		FileSystem.downloadAsync(
            fileUrl,
            `${FileSystem.documentDirectory}books/echos/${filename}`
            )
            .then(({ uri }) => {
				console.log("File Downloaded");
				console.log(uri);
				console.log(this.state.purchasedItem);
				

				//save the url to the database. 
				let sql = "UPDATE purchases set file_url = ? "
							+ " WHERE `id` = ? ";

				const params = [
					uri, this.state.purchasedItem.id
				];

				//execute the query.. 
				this.props.updateLoadingText("Saving book....");
				executeSQLQuery(sql, params)
					.then( rows => {
						this.setState({
							isDownloaded: true, 
							fileUrl: uri
						});

						console.log(rows);

					} )
					.catch( error => {
						this.props.onDownloadFinished();
						console.error(error);
						
						Alert.alert("Error!", "Failed to saved downloaded book");
					} )

				showMessage({
					message: "Your Book has been downloaded",
					type: "success",
				  });
				
				this.props.onDownloadFinished();

            })
            .catch(error => {
				this.props.onDownloadFinished();
                console.log(error);
            });
	}



	renderActionButtons(item)
	{
		//if the item has not yet been bought then show the buy button 

		if( ! this.state.isBought )
		{
			return (
				<Card.Actions style={styles.cardActionStyle}>
					<Button onPress={() => this.buyItem(item)} >Buy</Button>
				</Card.Actions>
			)
		}
		else {
			//item has been purchased... 
			//check if it has been downloaded.. 
			if( ! this.state.isDownloaded )
			{
				//file has not yet been downloaded... 
				return (
					<Card.Actions style={styles.cardActionStyle}>
						<Button onPress={() => this.downloadItem(item)} >Download</Button>
					</Card.Actions>
				)
			}
			else{
				//file has been downloaded... just show the open button 
				return (
					<Card.Actions style={[styles.cardActionStyle, ]}>
						<Button onPress={() => this.openBook()} >OPEN</Button>
					</Card.Actions>
				)
			}
		}
	}

	renderName()
	{

	}

	render()
	{
		const { item } = this.props.item;
		

		return (
			<Card elevation={5} style={styles.cardStyle}>
				<Card.Content>
					<Title>
						{ item.name }
					</Title>
					
				</Card.Content>

				{this.renderActionButtons(item)}
			</Card>
		)
	}
}

const styles = {
	cardStyle: {
		marginTop: 5,
	},

	cardActionStyle: {
		alignItems: 'flex-end',
		color: 'red',
		flexDirection: 'row',
	}
}

export default EchoItem;