import React from 'react';
import { Text, View, Image } from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';


const  HomeTab = (props) => {
	let textColor = props.focused ? '#333333' : '#999999'
	const settingImageFocused = <Avatar.Icon size={24} icon="folder" />
	const settingImageUnfocused = <Avatar.Icon size={24} icon="folder" />
	let settingImage = props.focused ? settingImageFocused : settingImageUnfocused
	let borderColor = props.focused ? '#333333' : '#FFFFFF'
	const iconName = "home"

	return (
		<View style={{flex: 1, flexDirection:'column', alignItems:'center', justifyContent:'center', borderTopColor: borderColor, borderTopWidth:4, padding:2}}>
			<Icon
				name='home'
				size={24}
				color='black'
				/>
			{/* <Text style={{color: textColor}}>Home</Text> */}
		</View>
	);
}

export default HomeTab;