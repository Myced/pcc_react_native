import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Avatar, Title, Caption, Paragraph } from 'react-native-paper';
import { ListItem, Divider } from 'react-native-elements';

class DrawerContent extends Component
{
	navigateToAboutUs()
	{

	}
	
	render(){

		const options = [
			{
                title: 'About App',
                icon: 'local-library',
                onPress: this.navigateToAboutUs.bind(this)
            },
		];
		return (
			<View style={{flex:1, marginTop: 25}}>
				<View style={styles.drawerContent}>
					<View style={styles.userInfoSection}>
						<View style={{
							flexDirection:'row',
							marginTop: 40, 
							marginBottom: 40, 
							alignContent: 'center',
							alignItems: 'center'}}>
							<Avatar.Image 
								source={ require('../../assets/icon.png') }
								size={70}
							/>
							<View style={{marginLeft:15, }}>
								<Title style={styles.title}>My PCC</Title>
							</View>
						</View>

						{/* <View style={styles.row}>
							<View style={styles.section}>
								<Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
								<Caption style={styles.caption}>Following</Caption>
							</View>
							<View style={styles.section}>
								<Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
								<Caption style={styles.caption}>Followers</Caption>
							</View>
						</View> */}
					</View>

					<Divider />

					<View>
					{
						options.map((item, i) => (
							<ListItem
								key={i}
								title={item.title}
								titleStyle={{ color: 'black' }}
								leftIcon={{ name: item.icon }}
								onPress={ item.onPress }
								bottomDivider
								topDivider={item.topDivider}
								chevron
							/>
						))
					}
					</View>
						
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });

export default DrawerContent;