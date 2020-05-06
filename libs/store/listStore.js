import { observable, action } from 'mobx';

class ListStore{
	@observable list = [];

	@action.bound
	setList(val){
		this.list = val
	}
}

export default new ListStore();