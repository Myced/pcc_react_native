import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PDFReader from 'rn-pdf-reader-js'

class PDFReaderScreen extends Component
{

	render(){
		const uri = this.props.file_url;
		return (
			<PDFReader
				source={{
					uri: uri,
				}}
			/>
			
		)
	}
}

export default PDFReaderScreen;