import axios from 'axios';
import { createHashHistory,createBrowserHistory } from 'history';
const history = createHashHistory();
export function fetchAPI(url, { method = 'GET', data }){
	return new Promise((resolve, reject) => {
		axios.request({
			url,
			method,
			data
		})
		.then(res => resolve(res && res.data))
		.catch(e => reject(e));
	})
}
export function notLogin(userId = '', params = {}){
	const { protol = 'http', host = '127.0.0.1', port = '5000', path = '/login' } = params;
	if(!userId){
		alert('请先登录');
		history.replace('/login')
		return true;
	}
	return false;
}