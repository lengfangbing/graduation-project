import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { fetchAPI, notLogin } from '@/utils';

import './index.less';

interface Props{
	userStore?: any
}
interface State{
	isEdit: boolean
	inputValue: {[key: string]: string}
}

@inject('userStore')
@observer
class UserCenter extends Component<Props, State>{
	constructor(props){
		super(props);
		this.state = {
			isEdit: false,
			inputValue: {
				userId: '',
				userName: '',
				userPassword: ''
			}
		}
	}

	componentDidMount(){
		const { userId, userName, password: userPassword } = this.props.userStore;
		if(notLogin(userId)){
			return;
		}
		this.setState({
			inputValue: {
				userId,
				userName,
				userPassword
			}
		})
	}

	inputChange(flag: string, value: string){
		const { inputValue } = this.state;
		this.setState({
			inputValue: {
				...inputValue,
				[flag]: value
			}

		})
	}
	confirmClick(flag: boolean){
    const { userStore: { postEdit } } = this.props;
    const { inputValue: { userId, userName, userPassword } } = this.state;
		if(flag){
			postEdit({ userId, name: userName, password: userPassword })
        .then(res => {
          if(res.code){
            const { data } = res;
            const { name, password } = data;
            this.setState({
              inputValue: {
                userId,
                userName: name,
                userPassword: password
              }
            })
			      this.cancelEdit()
          }
        })
        .catch(() => {
        })
		}else{
			this.setState({
				isEdit: true
			})
		}
	}

	cancelEdit = () => {
		this.setState({
			isEdit: false
		})
	}

	render(){
		const { isEdit, inputValue } = this.state;
		const { userId, userName, userPassword } = inputValue;
		if(!userId){
			return null;
		}
		return (
			<div className="user-center">
				<div className="user-center-wrapper">
					<div className="user-id form-field">
						<div className="center">
							<label>用户ID</label>:
							<Input
								controls={false}
								disabled={true}
								value={userId}
							/>
						</div>
					</div>
					<div className="user-name form-field">
						<div className="center">
							<label>用户名</label>:
							<Input
								controls
								value={userName}
								onChange={(target, value) => this.inputChange('userName', value)}
								disabled={!isEdit}
							/>
						</div>
					</div>
					<div className="user-password form-field">
						<div className="center">
							<label>用户密码</label>:
							<Input
								controls
								value={userPassword}
								onChange={(target, value) => this.inputChange('userPassword', value)}
								disabled={!isEdit}
							/>
						</div>
					</div>
					<div className="operation form-field">
						<div className="center">
							<Button onClick={this.confirmClick.bind(this, isEdit)} >
								{isEdit ? '确定' : '编辑'}
							</Button>
							{
								isEdit 
									? <Button type='cancel' onClick={this.cancelEdit} >取消</Button> 
									: null
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default UserCenter;