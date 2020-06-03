import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { notLogin } from '@/utils';
import Item from './item';
import './index.less';

interface Props {
	listStore?: any,
	userStore?: any
}
interface State{
	list: any[]
}
@inject('listStore', 'userStore')
@observer
class CheckMy extends Component<Props, State>{

	constructor(props) {
		super(props);
		this.state = {
			list: []
		}
	}

	componentDidMount(){
		const { userId } = this.props.userStore;
		if(notLogin(userId)){
			return;
		}
		this.getList();
	}

	getList(){
		const { getMyList } = this.props.listStore;
		const { userId } = this.props.userStore;
		getMyList(`userId=${userId}`)
			.then(res => {
				if(res){
					this.setState({
						list: res
					})
				}
			})
	}

	render() {
		const { userId } = this.props.userStore;
		if(!userId){
			return null;
		}
		const { list } = this.state;
		return (
			<div className='check-my'>
				<div className="check-my-wrapper">
					{
						list.map(val => {
							return (
								<Item
									key={val.invitationId}
									config={{
										title: `${val.title}  -- ${val.author}`,
										html: val.content,
										id: val.invitationId,
                    commets: val.commets
									}}
								/>
							);
						})
					}
				</div>
			</div>
		);
	}

}
/**
 * 
 * <Item config={{ html: '12345<p>5555</p>' }} />
					<Item config={{ html: '12345<p>5555</p>' }} />
					<Item config={{ html: '12345<p>5555</p>' }} />
					<Item config={{ html: '12345<p>5555</p>' }} />
 */
export default CheckMy;