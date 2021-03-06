import React, { Component } from 'react';
import Header from '@/routes/header';
import Navigation from '@/routes/navigation';
import Content from '@/routes';
import { HashRouter as Router } from 'react-router-dom';
import './index.less';
import '../libs/components/toast/index';

declare global{
	interface Window {
		Toast: any,
		showToast: Function
	}
}
class Index extends Component {

	render() {
		return (
			<Router>
				<div className="content">
					<Header />
					<div className="content-wrapper">
						<Navigation />
						<Content />
					</div>
				</div>
			</Router>
		);
	}
}

export default Index;
