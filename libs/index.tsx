import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import './index.less';
interface Props{
	store: any
}
@inject('store')
@observer
class Index extends Component<Props>{

	constructor(props){
		super(props);
	}

	render(){
		const { userStore } = this.props.store;
		return <Router>
			<div className="content">
				
			</div>
		</Router>;
	}
}

export default Index;