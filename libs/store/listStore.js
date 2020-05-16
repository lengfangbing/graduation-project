import { observable, action } from 'mobx';

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
}

export default new ListStore();