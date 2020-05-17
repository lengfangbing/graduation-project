import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { notLogin } from '@/utils';
import Item from './item';

import './index.less';

interface Props{
	messageStore?: any,
	userStore?: any
}
interface State{

}
@inject('messageStore', 'userStore')
@observer
class Message extends Component<Props, State>{
	constructor(props){
		super(props);
		this.state = {

		}
	}
	
	componentDidMount(){
		const { userId } = this.props.userStore;
		if(notLogin(userId)){
			return;
		}
	}

	render(){
		const { userId } = this.props.userStore;
		if(!userId){
			return null;
		}
		return (
			<div className='message'>
				<div className="message-wrapper">
					
				</div>
			</div>
		);
	}
}
/**
 * 
 * <Item config={{content: '我是他回复的内容'}} />
					<Item config={{content: '我是他回复的内容'}} />
					<Item config={{content: '我是他回复的内容'}} />
					<Item config={{content: '我是他回复的内容'}} />
					<Item config={{content: '我是他回复的内容'}} />
					<Item config={{content: '我是他回复的内容'}} />
					<Item config={{content: '我是他回复的内容'}} />
 */
export default Message;