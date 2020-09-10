import React from 'react';
import { StyleSheet } from 'react-native';
import { default as LoadSpinner } from 'react-native-loading-spinner-overlay';

const Spinner = (props) => {
	
	return (
		<LoadSpinner
			visible={props.visible}
			textContent={props.text}
			textStyle={styles.spinnerTextStyle}
			animation="fade"
		/>
	)
}

const styles = StyleSheet.create({
	spinnerTextStyle: {
	  color: '#FFF'
	},
	container: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: '#D5DCDD'
	},

});

export default Spinner;