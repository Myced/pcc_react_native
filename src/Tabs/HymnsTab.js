import React from 'react';
import { Text, View, Image } from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../config/Config';


const  HymnsTab = (props) => {
	let textColor = props.focused ? colors.primary : '#999999'
	let iconColor = props.focused ? colors.primary : '#777'
	let borderColor = props.focused ? colors.primary : '#FFFFFF'
	const iconName = "import-contacts"

	return (
		<View style={{flex: 1, flexDirection:'column', alignItems:'center', justifyContent:'center', borderTopColor: borderColor, borderTopWidth:1, padding:2}}>
			<Icon
				name={iconName}
				size={30}
				color={iconColor}
				/>
			{/* <Text style={{color: textColor}}>Home</Text> */}
		</View>
	);
}

export default HymnsTab;