import { observable, action } from 'mobx';

class MessageStore{
	@observable list = [];

	@action.bound
	setList(v){
		this.list = v;
	}
	@action.bound
	resetList(){
		this.list = [];
	}
}

export default new MessageStore();