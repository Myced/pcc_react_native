import AsyncStorage from '@react-native-community/async-storage';
import AsyncKeys from '../utils/AsyncKeys';

const getUser = async () => {
	let finalUser = null;

	try {
		const user = await AsyncStorage.getItem(AsyncKeys.userKey);

		if(user)
		{
			finalUser = JSON.parse(user);
		}
	} catch (error) {
		console.log(error)
	}

	return finalUser;
}

export {
	getUser
}

