import React from 'react';
import { Text, View, Image } from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

import { colors } from '../config/Config';


const  HomeTab = (props) => {
	let textColor = props.focused ? '#333333' : '#999999'
	let iconColor = props.focused ? colors.primary : '#000'
	let borderColor = props.focused ? colors.primary : '#FFFFFF'
	const iconName = "home"

	return (
		<View style={{flex: 1, flexDirection:'column', alignItems:'center', justifyContent:'center', borderTopColor: borderColor, borderTopWidth:4, padding:2}}>
			<Icon
				name={iconName}
				size={30}
				color={iconColor}
				/>
			{/* <Text style={{color: textColor}}>Home</Text> */}
		</View>
	);
}

export default HomeTab;