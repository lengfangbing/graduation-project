import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './item.less';
interface Props {
	config: {[key: string]: string | number | boolean}
}
interface State {
	commet: string
}
class Item extends Component<Props, State>{
	constructor(props){
		super(props);
		this.state = {
			commet: ''
		}
	}

	componentDidMount(){
		const { html } = this.props.config;
		const target = ReactDOM.findDOMNode(this.refs['html']) as HTMLInputElement;;
		target.innerHTML = html.toString();
	}

	commetChange = (e) => {
		this.setState({
			commet: e.target.value
		})
	}

	render(){
		const { config } = this.props;
		const { title } = config;
		const { commet } = this.state;
		return (
			<div className="item">
				<div className="item-title">
					<span>标题和作者: {title}</span>
				</div>
				<div className="item-content" ref="html">
				</div>
				<div className="item-commet">
					<div className="item-wrapper">
					</div>
				</div>
			</div>
		);
	}
}

export default Item;