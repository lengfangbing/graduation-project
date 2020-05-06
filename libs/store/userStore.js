import { observable, action } from 'mobx';

class UserStore{
	@observable userId = 'dwa';
	@observable userName = 'rsgsge';
	@observable userAuth = '';

	@action.bound
	setUserId(v){
		this.userId = v;
	}

	@action.bound
	setUserName(v){
		this.userName = v;
	}

	@action.bound
	setUserAuth(v){
		this.userAuth = v;
	}
}

export default new UserStore();