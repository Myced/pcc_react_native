import { Dimensions } from "react-native";

const colors = {
	primary: "#ee0057",
	background: "#e4e4e4"
}

const database = {
	name: 'pcc.db',
}

let Device = {
	width: 0,
	height: 0
};

const API_HOST = "http://pcc.pefscomsys.com/api/";
// const API_HOST = "http://127.0.0:8000/api/";

let Api = {};

Api.presbyterianEchoUrl = API_HOST + 'echos';
Api.theMessengerUrl = API_HOST + "messengers";
Api.registerUrl = API_HOST + "auth/register";
Api.loginUrl = API_HOST + "auth/login";
Api.diaryYearUrl = (year) => API_HOST + 'diary/detail/' + year;
Api.itemPurchaseUrl = API_HOST + "user/purchase/add";

Device.width = Math.round(Dimensions.get('window').width);
Device.height = Math.round(Dimensions.get('window').height);

export {
	colors,
	Device,
	database,
	Api,
}