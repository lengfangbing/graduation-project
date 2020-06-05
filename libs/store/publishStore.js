import { observable, action } from 'mobx';
import { fetchAPI } from '@/utils';

class PublishStore {
	@observable html = '';

	@action.bound
	setHtml(val){
		this.html = val
	}
	@action.bound
  postPublish(params){
    return fetchAPI('http://127.0.0.1:3000/publish', {
			method: 'POST',
			data: params
		})
      .then(res => {
        showToast({title: res.message});
        return res;
      })
      .catch((e) => {
        showToast({title: '网络错误'});
        Promise.reject();
      });
  }
}

export default new PublishStore();
