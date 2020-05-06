import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Button from '@/components/Button';
import E from 'wangeditor';
import { fetchAPI } from '@/utils';
import './index.less';

interface Props {
	publishStore?: any
}
interface State {
	html: string
}
@inject('publishStore')
@observer
class Publish extends Component<Props, State>{

	constructor(props) {
		super(props);
		this.state = {
			html: ''
		}
	}

	componentDidMount() {
		const { html } = this.props.publishStore;
		const elem = this.refs.editor;
		const editor = new E(elem);
		// 使用 onchange 函数监听内容的变化，并实时更新到 state 中
		editor.customConfig.onchange = html => {
			this.setState({
				html
			})
		}
		editor.customConfig.uploadImgShowBase64 = true;
		editor.create();
		editor.txt.html(html);
	}

	componentWillUnmount() {
		const { setHtml } = this.props.publishStore;
		const { html } = this.state;
		setHtml(html);
	}

	publishFunc = () => {
		console.log(fetchAPI)
	}

	render() {
		return (
			<div className='publish'>
				<div ref="editor" className='editor' style={{ textAlign: 'left' }}>
				</div>
				<div className="operation">
					<Button
						timer={300}
						onClick={this.publishFunc}
					>发表</Button>
				</div>
			</div>
		);
	}

}

export default Publish;