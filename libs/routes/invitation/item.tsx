import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '@/components/Button';
import './item.less';
interface Props {
	config: {[key: string]: any},
	onClick: Function
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
		const { config, onClick } = this.props;
		const { commet } = this.state;
		if(commet.trim() === ''){
			return alert('请输入回复内容');
		};
		onClick(commet);
	}

	render(){
		const { config } = this.props;
		const { title, commets } = config;
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
            {
              commets.map(val => {
                return (
                  <p className="commet" key={val._id} >
                    {val.user}回复了你: {val.reply}
                  </p>
                );
              })
            }
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