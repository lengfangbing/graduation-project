import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';

interface Props{
	listStore?: any
}
@inject('listStore')
@observer
class Invitation extends Component<Props>{

	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className='invitation'>
				
			</div>
		);
	}

}

export default Invitation;