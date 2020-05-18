import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './item.less';
interface Props {
	config: {[key: string]: string | number | boolean}
}
interface State {
}
class Item extends Component<Props, State>{
	constructor(props){
		super(props);
		this.state = {
		}
	}

	componentDidMount(){
		const { content } = this.props.config;
		const target = ReactDOM.findDOMNode(this.refs['content']) as HTMLInputElement;;
		target.innerHTML = content.toString();
	}

	commetChange = (e) => {
		this.setState({
			commet: e.target.value
		})
	}

	replayClick = () => {

	}

	render(){
		const { config } = this.props;
		return (
			<div className="message-item">
				<div className="message-item-title">
					<span>xxxxx分外 回复了你</span>
				</div>
				<div className="message-item-content" ref="content">
				</div>
			</div>
		);
	}
}

export default Item;