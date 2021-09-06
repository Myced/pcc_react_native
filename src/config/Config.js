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

const MomoEnvironments = {
	PRODUCTION: "production",
	SANDBOX: "sandbox"
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

let MomoApi = {};
// MomoApi.primaryKey = "1b5b32cb33fe47a98153a08a31722355";
// MomoApi.secondaryKey = "70d93c92e15945589bf2377a931de7e7";

// //new for the PCC account.
// MomoApi.primaryKey = "fd9316ce2bfd4aef80dc4357189c48a9";
// MomoApi.secondaryKey = "8ba8e6f63c014effbdb544473ecd76fc";

//production data 
MomoApi.primaryKey = "9d75ac375684489691e8e4bd70f663de";
MomoApi.secondaryKey = "b8fe6e3029ae4162bce7dc6f17e7bd3f";

MomoApi.userKey = "010d94dc-fafe-422b-adf1-70e0e552b6e9";
MomoApi.userSecret = "634ee09f1a7e4cf19527505f731ccf96";
MomoApi.accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6Ijg4OWQ1ZWQ4LWNiZDgtNDFkZS04ZGMwLTAyZTMwNWUzYTI0YSIsImV4cGlyZXMiOiIyMDIwLTEwLTI3VDA4OjQ0OjI5LjQwNCIsInNlc3Npb25JZCI6IjY2ZDgwYTBmLWVjMGMtNDdhMy1hYmJlLWJlN2Y5MTE3ZmY4MSJ9.WsIKSdc6t-DUCC9dl6ItGS2gBPV_io3yKip6IC5iZgThmQQ5HaZT6F_tRvU7949T7CcQ75vSUmLvBddY819iPC5LnIiG2CtjY-dvh8QPG1WO_xvYYpXrqokcnoZrfUGuMJKAG5U4gAjWrCu5E3a7UGo418vodqBy-ju92haDfut7bB4YehQnyW5ykpSo4W11Rr0sTPfLql2wxuY5ou5qhFzfwRJKsGMGpZc7CrvOY5hzxBMdJnMaespee9SgWBkvKJy6LzG_nHfC5L0JhI9J28kmsXUmZPYK3jyyh9AhH7zViYH0sm7CmNKWFJwyNyD5WjrQ0IIxfJV5LeyThEA0rA";

//sandbox user crendentials 
MomoApi.sandbox = {};
// MomoApi.sandbox.user_id = "aff03914-d270-40fd-a764-11954a7dec5b";
// MomoApi.sandbox.user_secret = "fe34e685334344beae747893c3a3e41c";

MomoApi.sandbox.user_id = "f4aa6881-4190-4ef1-8759-c2dd4423a99e"; //new for the PCC Account.
MomoApi.sandbox.user_secret = "049d3dda50234db7a9b9ca450365a6a7";

//base url and all 
MomoApi.baseUrl = "https://proxy.momoapi.mtn.com/collection/v1_0/";
MomoApi.environment = MomoEnvironments.SANDBOX;
// MomoApi.callbackUrl = "	https://webhook.site/1e1d0829-90d2-4868-826b-879dd707bd16";
MomoApi.callbackUrl = "http://pefscomsys.com";
MomoApi.tokenUrl = "https://proxy.momoapi.mtn.com/collection/token/";
MomoApi.requestToPayUrl = "https://proxy.momoapi.mtn.com/collection/v1_0/requesttopay";


export {
	colors,
	Device,
	database,
	Api,
	MomoApi,
}