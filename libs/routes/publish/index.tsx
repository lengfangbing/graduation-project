import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import E from 'wangeditor';
import { notLogin } from '@/utils';
import './index.less';

interface Props {
	publishStore?: any,
	userStore?: any
}
interface State {
	title: String,
	html: string
}
@inject('publishStore', 'userStore')
@observer
class Publish extends Component<Props, State>{

	constructor(props) {
		super(props);
		this.state = {
			title: '',
			html: ''
		}
	}

	componentDidMount() {
		const { userId } = this.props.userStore;
		if (notLogin(userId)) {
			return;
		}
		const { html } = this.props.publishStore;
		const elem = this.refs.editor;
		const editor = new E(elem);
		// 使用 onchange 函数监听内容的变化，并实时更新到 state 中
		editor.customConfig.onchange = html => {
			console.log(html);
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

	inputChange(val){
		this.setState({
			title: val
		})
	}

	publishFunc = () => {
		const { userId, userName } = this.props.userStore;
		const { postPublish } = this.props.publishStore;
		const { title, html } = this.state;
		if(title.trim() === '' || html.trim() === ''){
			return alert('请不要输入空标题/文本');
		}
		postPublish({
			title,
			content: html,
			author: userName,
			authorId: userId
		}).then(res => {
			
		})
	}

	render() {
		const { userId } = this.props.userStore;
		if (userId === '') {
			return null;
		}
		return (
			<div className='publish'>
				<div className="title">
					<Input
						controls
						placeholder="请输入标题"
						onChange={(target, value) => {
							this.inputChange(value)
						}}
					/>
				</div>
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