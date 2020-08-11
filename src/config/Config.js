import { Dimensions } from "react-native";

const colors = {
	primary: "#ee0057",
	background: "#e4e4e4"
}

let Device = {
	width: 0,
	height: 0
};

Device.width = Math.round(Dimensions.get('window').width);
Device.height = Math.round(Dimensions.get('window').height);

export {
	colors,
	Device
}