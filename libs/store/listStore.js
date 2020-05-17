import { observable, action } from 'mobx';
import { fetchAPI } from '@/utils';

class ListStore{
	@observable list = [];

	@action.bound
	setList(val){
		this.list = val;
	}
	@action.bound
	resetList(){
		this.list = [];
	}
	@action.bound
  getList() {
    return fetchAPI("http://127.0.0.1:3000/getList", {
      method: "GET",
    })
      .then((res) => {
        if (res.code) {
          const { data } = res;
          return data;
        }
        return null;
      })
      .catch((e) => {
        alert("网络错误");
        Promise.reject();
      });
	}
	@action.bound
  getMyList(query) {
    return fetchAPI(`http://127.0.0.1:3000/getMyList/?${query}`, {
			method: "GET"
    })
      .then((res) => {
        if (res.code) {
          const { data } = res;
          return data;
        }
        return null;
      })
      .catch((e) => {
        alert("网络错误");
        Promise.reject();
      });
	}
	@action.bound
	postCommet(params){
		return fetchAPI('http://127.0.0.1:3000/reply', {
			method: "POST",
			data: params
    })
      .then((res) => {
				alert(res.message);
        if (res.code) {
          const { data } = res;
          return data;
        }
        return null;
      })
      .catch((e) => {
        alert("网络错误");
        Promise.reject();
      });
	}
}

export default new ListStore();