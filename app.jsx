import React, { Component } from 'react';
import { render } from 'react-dom';
import Index from '@/index';
import { Provider } from 'mobx-react';
import store from '@/store';

class App extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return <Provider store={store}>
			<Index/>
		</Provider>;
	} 
}



render(<App/>, document.getElementById('main'));