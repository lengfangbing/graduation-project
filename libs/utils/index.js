import axios from 'axios'
export function fetchAPI(url, { method = 'GET', data }){
	return new Promise(resolve => {
		axios.request({
			url,
			method,
			data
		}).then(res => resolve(res))
	})
}