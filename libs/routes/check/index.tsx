import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Item from './item';
import './index.less';

interface Props {
	adminStore?: any
}
interface State{
	list: any[]
}
@inject('adminStore')
@observer
class Check extends Component<Props, State>{

	constructor(props) {
		super(props);
		this.state={
			list: []
		}
	}

	componentDidMount(){
		this.setCheckList();
	}

	setCheckList(){
		const { getCheckList } = this.props.adminStore;
		getCheckList()
			.then(res => {
				if(res){
					this.setState({
						list: res
					});
				}
			});
	}

	replyClick(flag, val){
		const { acceptInvitation, rejectInvitation } = this.props.adminStore;
		const { invitationId } = val;
		if(flag === 1){
			// 通过
			acceptInvitation({invitationId})
				.then(res => {
					if(res){
						this.setCheckList();
					}
				})
		}else{
			// 驳回
			rejectInvitation({invitationId})
				.then(res => {
					if(res){
						this.setCheckList();
					}
				})
		}
		console.log(flag);
		console.log(val);
	}

	render() {
		const { list } = this.state;
		return (
			<div className='check'>
				<div className="check-wrapper">
					{
						list.map(val => {
							return (
								<Item
									key={val.invitationId}
									config={{
										title: `${val.title}  -- ${val.author}`,
										html: val.content
									}}
									onClick={(flag) => this.replyClick(flag, val)}
								/>
							);
						})
					}
				</div>
			</div>
		);
	}

}
export default Check;