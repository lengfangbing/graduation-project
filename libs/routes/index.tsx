import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Route, Router, Switch } from 'react-router-dom';
import Invitation from './invitation/index'
import Publish from './publish/index'
import { createBrowserHistory } from 'history'
import './index.less';
interface Props {
	userStore?: any
}
const history = createBrowserHistory()
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
				</Switch>
			</div>
		);
	}

}

export default Content;