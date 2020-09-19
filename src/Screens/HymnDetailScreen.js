import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';

import { colors } from '../config/Config';

class HymnDetailScreen extends Component
{
	render(){
		const hymn = this.props.hymn.item;
		const content = this.buildHtml(hymn.content);
		
		return (
			<View style={{ flex: 1 }}>
				<View style={ styles.readingTitleContainer }>
					<Text style={styles.readingTitleText}>
						CHB {hymn.number}
					</Text>
				</View>

				<View style={{ flex: 1}}>
					<WebView
						source={{
							html: content
						}}
						style={{ fontSize: 20, flex: 1, borderColor: 'blue', borderWidth:4, height: 200 }}
						/>
				</View>
			</View>
		)
	}

	buildHtml(content)
	{
		const html = `
			<html>
				<head>
					<meta name="viewport" content="width=device-width, initial-scale=1">
					<style>
						body {
							font-size: 16px;
						}
					</style>
				</head>

				<body>
					${content}
				</body>
			</html>
		`;

		return html;
	}
}


const styles = StyleSheet.create({
	readingTitleContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 5,
		marginBottom: 10
	},

	readingTitleText: {
		fontSize: 25,
		fontWeight: 'bold',
		color: "#0101f7",
	},

	readingTextContent: {
		fontSize: 18,
		alignItems: "center",
		textAlign: 'justify',
		marginBottom: 10
	},

	readingTextContainer: {
		flex: 1,
		margin: 10,
		marginBottom: 20,
		borderColor: 'green',
		borderWidth: 2
	},

	textTitleStyle:{
		fontSize: 20,
		color: colors.primary,
		fontWeight: 'bold',
		marginBottom: 5,
		marginTop: 10
	}
})

export default HymnDetailScreen;