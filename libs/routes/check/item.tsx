import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Button from '@/components/Button';
import './item.less';
interface Props {
	config: { [key: string]: string | number | boolean },
	onClick: Function
}
class Item extends PureComponent<Props>{
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { html } = this.props.config;
		const target = ReactDOM.findDOMNode(this.refs['html']) as HTMLInputElement;;
		target.innerHTML = html.toString();
	}

	replayClick(val) {
		this.props.onClick
		  && this.props.onClick(val);
	}

	render() {
		const { config } = this.props;
		return (
			<div className="item">
				<div className="item-title">
					<span>标题和作者:　{config.title}</span>
				</div>
				<div className="item-content" ref="html">
				</div>
				<div className="buttons">
					<Button
						onClick={this.replayClick.bind(this, 1)}
					>通过</Button>
					<Button
						type="cancel"
						onClick={this.replayClick.bind(this, 0)}
					>驳回</Button>
				</div>
			</div>
		);
	}
}

export default Item;