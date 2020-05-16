import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { notLogin } from '@/utils';
import Item from '../invitation/item';
import './index.less';

interface Props {
	listStore?: any,
	userStore?: any
}
@inject('listStore', 'userStore')
@observer
class CheckMy extends Component<Props>{

	constructor(props) {
		super(props);
	}

	componentDidMount(){
		const { userId } = this.props.userStore;
		if(notLogin(userId)){
			return;
		}
	}

	componentWillUnmount(){
		const { resetList } = this.props.listStore;
		resetList();
	}

	render() {
		const { userId } = this.props.userStore;
		if(userId === ''){
			return null;
		}
		return (
			<div className='check-my'>
				<div className="check-my-wrapper">
					
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