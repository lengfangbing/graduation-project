import { observable, action } from 'mobx';

class UserStore{
	@observable userId = '';
	@observable userName = '';
	@observable userAuth = '';

	setUserId(v){
		this.userId = v;
	}

	setUserName(v){
		this.userName = v;
	}

	setUserAuth(v){
		this.userAuth = v;
	}
}

export default new UserStore();