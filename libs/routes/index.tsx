import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Route, Router, Switch } from 'react-router-dom';
import Publish from './publish/index';
import CheckMy from './checkMy/index';
import Invitation from './invitation/index';
import Check from './check/index';
import Login from './login/index';
import UserCenter from './userCenter/index';
import { createHashHistory } from 'history';
import './index.less';
interface Props {
	userStore?: any
}
const history = createHashHistory()
@inject('userStore')
@observer
class Content extends Component<Props>{

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='routes-wrapper'>
				<Switch>
					<Route exact path={'/publish'} component={Publish} />
					<Route exact path={'/'} component={Invitation} />
					<Route exact path={'/login'} component={Login} />
					<Route exact path={'/checkMy'} component={CheckMy} />
					<Route exact path={'/check'} component={Check} />
					<Route exact path={'/userCenter'} component={UserCenter} />
				</Switch>
			</div>
		);
	}

}

export default Content;