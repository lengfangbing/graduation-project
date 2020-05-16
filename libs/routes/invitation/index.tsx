import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Item from './item';
import './index.less';

interface Props {
	listStore?: any
}
@inject('listStore')
@observer
class Invitation extends Component<Props>{

	constructor(props) {
		super(props);
	}

	componentWillUnmount(){
		const { resetList } = this.props.listStore;
		resetList();
	}

	render() {
		return (
			<div className='invitation'>
				<div className="invitation-wrapper">
					
				</div>
			</div>
		);
	}

}

/**
 * 
 * <Item config={{ author: 'lfb', html: '12345<p>5555</p>' }} />
					<Item config={{ author: 'lfb', html: '12345<p>5555</p>' }} />
					<Item config={{ author: 'lfb', html: '12345<p>5555</p>' }} />
					<Item config={{ author: 'lfb', html: '12345<p>5555</p>' }} />
					<Item config={{ author: 'lfb', html: '12345<p>5555</p>' }} />
 */
export default Invitation;