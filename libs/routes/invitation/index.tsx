import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Item from './item';
import './index.less';

interface Props {
	listStore?: any
	userStore?: any
}
interface State{
	list: any[]
}
@inject('listStore', 'userStore')
@observer
class Invitation extends Component<Props, State>{
	constructor(props) {
		super(props);
		this.state = {
			list: []
		}
	}

	componentDidMount(){
		this.getList();
	}

	getList(){
		const { getList } = this.props.listStore;
		getList()
			.then(res => {
				if(res){
					this.setState({
						list: res
					})
				}
			})
	}

	sendCommet(config, reply){
		const { postCommet } = this.props.listStore;
		const { userId, userName } = this.props.userStore;
		const { invitationId, authorId } = config;
		if(!userId){
			return alert('请先登录');
		}
		postCommet({
			user: userName,
			invitationId: invitationId,
			authorId: authorId,
			userId,
			reply
		})
			.then(res => {
				console.log(res);
			})
	}

	replyClick(reply, config){
		this.sendCommet(config, reply);
	}

	render() {
		const { list } = this.state;
		return (
			<div className='invitation'>
				<div className="invitation-wrapper">
					{
						list.map(val => {
							return (
								<Item
									key={val.invitationId}
									config={{
										title: `${val.title}  -- ${val.author}`,
										html: val.content,
										id: val.invitationId
									}}
									onClick={(reply) => this.replyClick(reply, val)}
								/>
							);
						})
					}
				</div>
			</div>
		);
	}

}
export default Invitation;