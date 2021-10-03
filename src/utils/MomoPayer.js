import axios from 'axios';
import { MomoApi } from '../config/Config';

let momo = {};

momo.getAccessToken = () => {

	return new Promise((resolve, reject) => {

		const API_USER = MomoApi.userKey;
		const API_KEY = MomoApi.userSecret;

		const token_url = MomoApi.tokenUrl;

		const auth = {
			username: API_USER,
			password: API_KEY
		}

		const headers = {
			'Ocp-Apim-Subscription-Key': MomoApi.primaryKey
		}

		axios.post(token_url, {}, {
			auth: auth,
			headers: headers
		})
		.then(response => resolve(response.data))
		.catch(error => reject(error));

	})
	
}

momo.requestToPay = (refernceId, request, token) => {
	return new Promise((resolve, reject) => {

		const headers = {
			"X-Reference-Id": refernceId,
			"X-Target-Environment": "mtncameroon",
			"Ocp-Apim-Subscription-Key": MomoApi.primaryKey,
			"Authorization": "Bearer " + token
		}

		const body = request;
		const url = MomoApi.requestToPayUrl;
		//perform the request 
		axios.post(url, body, { headers: headers })
			.then( response => resolve(response) )
			.catch( error => reject(error) );

	})
}

momo.checkPaymentStatus = ( referenceId, token ) => {
	return new Promise((resolve, reject) => {

		const headers = {
			"X-Target-Environment": "mtncameroon",
			"Ocp-Apim-Subscription-Key": MomoApi.primaryKey,
			"Authorization": "Bearer " + token
		}

		const url = MomoApi.checkTransactionUrl(referenceId);

		//perform the request 
		axios.get(url, { headers: headers })
			.then( response => resolve(response) )
			.catch( error => reject(error) );

	})
}

export {
	momo
};