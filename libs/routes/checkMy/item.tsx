import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './item.less';
interface Props {
	config: {[key: string]: any}
}
interface State {
	
}
class Item extends Component<Props, State>{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		const { html } = this.props.config;
		const target = ReactDOM.findDOMNode(this.refs['html']) as HTMLInputElement;;
		target.innerHTML = html.toString();
	}

	render(){
		const { config } = this.props;
		const { title, commets } = config;
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
			</div>
		);
	}
}

export default Item;