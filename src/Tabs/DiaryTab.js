import React from 'react';
import { Text, View, Image } from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { colors } from '../config/Config';


const  DiaryTab = (props) => {
	let textColor = props.focused ? '#333333' : '#999999'
	let iconColor = props.focused ? colors.primary : '#777'
	let borderColor = props.focused ? colors.primary : '#FFFFFF'
	const iconName = "bible"

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

export default DiaryTab;