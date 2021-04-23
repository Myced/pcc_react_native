import { colors } from '../config/Config';

const titleStyle =  {
	color: colors.primary,
	fontSize: 20,
	fontWeight: 'bold',
	padding: 10,
	marginTop: 10,
	marginBottom: 10,
};

const titleContainer = {
	justifyContent: 'center',
	alignItems: 'center',
};

const backGroundStyle = {
	backgroundColor: colors.background
};

const mainContainerStyle = {
	backgroundColor: colors.background,
	flex: 1,
	marginBottom: 0
}

const containerStyle = {
	flex: 1,
	marginBottom: 0
}

export {
	titleStyle,
	containerStyle,
	titleContainer,
	backGroundStyle,
	mainContainerStyle,
};