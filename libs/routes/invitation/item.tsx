import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '@/components/Button';
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

	replayClick = () => {

	}

	render(){
		const { config } = this.props;
		const { author } = config;
		const { commet } = this.state;
		return (
			<div className="item">
				<div className="item-title">
					<span>{author}</span>
				</div>
				<div className="item-content" ref="html">
				</div>
				<div className="item-commet">
					<div className="item-wrapper">
					</div>
				</div>
				<textarea
					rows={4}
					placeholder="请输入回复"
					onChange={this.commetChange}
				></textarea>
				<Button
					disabled={!commet}
					onClick={this.replayClick}
				>回复</Button>
			</div>
		);
	}
}

export default Item;