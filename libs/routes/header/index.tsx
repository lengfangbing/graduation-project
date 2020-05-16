import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link, BrowserRouter as Router, withRouter } from 'react-router-dom';

import './index.less';

interface Props {
	userStore?: any
}

@inject('userStore')
@observer
class Header extends Component<Props>{

	constructor(props) {
		super(props);
	}

	renderNotLogin() {
		return (
			<Link to='/login'>登录/注册</Link>
		);
	}

	renderLogined(userStore) {
		return (
			<div className='header-message'>
				<span className='user-name'>欢迎您: {userStore.userName}</span>
				{
					userStore.userAuth === 1
						? null
						: <Link to='/userCenter'>
							个人中心
					</Link>
				}
				{
					userStore.userAuth === 1
						? null
						: <Link to='/message'>
							消息中心
						</Link>
				}
			</div>
		);
	}

	render() {
		const { userStore } = this.props;
		return (
			<div className='header'>
				<div className="header-content">
					<h1 className='title'>毕业设计论坛demo</h1>
					{
						userStore.userId
							? this.renderLogined(userStore)
							: this.renderNotLogin()
					}
				</div>
			</div>
		);
	}

}

export default withRouter(Header);