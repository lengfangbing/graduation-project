import { observable, action } from 'mobx';

class PublishStore {
	@observable html = '';

	@action.bound
	setHtml(val){
		this.html = val
	}
}

export default new PublishStore();