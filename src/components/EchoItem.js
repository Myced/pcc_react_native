import React, { Component } from 'react';
import { Button, Card, Title } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import { showMessage, hideMessage } from "react-native-flash-message";

class EchoItem extends Component {

	downloadItem(item)
	{
		const fileUrl = item.url;
		const filename = item.code + ".pdf";

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

	render()
	{
		const { item } = this.props.item;

		return (
			<Card elevation={5} style={styles.cardStyle}>
				<Card.Content>
					<Title>{ item.name }</Title>
				</Card.Content>

				<Card.Actions style={styles.cardActionStyle}>
					<Button onPress={() => alert("ok")} >Buy</Button>
					<Button onPress={() => this.downloadItem(item)} >Download</Button>
				</Card.Actions>
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