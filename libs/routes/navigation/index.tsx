import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link, BrowserRouter as Router, withRouter } from 'react-router-dom';

import './index.less';
interface Props {
	userStore?: any
}

@inject('userStore')
@observer
class Navigation extends Component<Props>{

	constructor(props) {
		super(props);
	}

	renderAdminOpera() {
		const { userAuth } = this.props.userStore;
		return (
			userAuth === 1
				? <Link to={'/check'} >审核帖子</Link>
				: null
		);
	}
	render() {
		return (
			<div className="navigation">
				<Link to={'/publish'} >我要发帖</Link>
				<Link to={'/checkMy'} >我的帖子</Link>
				<Link to={'/'} >查看帖子</Link>
				{this.renderAdminOpera()}
			</div>
		);
	}
}

export default withRouter(Navigation);