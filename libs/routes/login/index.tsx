import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Password from '@/components/Password';
import { fetchAPI } from '@/utils';
import { createHashHistory, createBrowserHistory } from 'history';
const history = createHashHistory();
import './index.less';
interface Props {
  userStore?: any
}
interface State {
  type: string,
  loginName: string,
  loginPassword: string,
  registerName: string,
  registerPassword: string,
  registerConfirm: string,
  isLogin: boolean,
  isRegister: boolean
}
@inject('userStore')
@observer
class Login extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      type: 'login',
      loginName: '',
      loginPassword: '',
      registerName: '',
      registerPassword: '',
      registerConfirm: '',
      isLogin: false,
      isRegister: false
    }
  }

  componentDidMount() {
    const { userId } = this.props.userStore;
    if (userId) {
      history.replace('/')
    }
  }

  tabClick(type) {
    this.setState({
      type
    })
  }

  inputChange(state) {
    this.setState(state)
  }

  clickLogin = () => {
    const { loginName, loginPassword, isLogin } = this.state;
    const { postLogin } = this.props.userStore;
    if (isLogin) {
      return;
    }
    this.setState({
      isLogin: true
    })
    postLogin({ loginName, loginPassword })
      .then((res) => {
        this.setState({
          isLogin: false
        })
        res.code && history.push('/')
      })
      .catch(() => {
        this.setState({
          isLogin: false
        })
      });
  }

  clickRegister = () => {
    const { registerName, registerPassword, registerConfirm, isRegister } = this.state;
    const { postRegister } = this.props.userStore;
    if (isRegister) {
      return;
    }
    this.setState({
      isRegister: true
    })
    if (registerPassword !== registerConfirm) {
      window.Toast.show({ttile: '两次密码不一致'});
      this.setState({
        isRegister: false
      })
      return;
    }
    postRegister({ registerName, registerPassword })
      .then((res) => {
        this.setState({
          isRegister: false
        })
        res.code && history.push('/')
      })
      .catch(() => {
        this.setState({
          isRegister: false
        })
      });
  }

  renderTab() {
    const { type } = this.state;
    return (
      <div className="tabs">
        <div
          className={`login ${type === 'login' ? 'hover' : ''}`}
          onClick={this.tabClick.bind(this, 'login')}
        >登录</div>
        <div
          className={`register ${type === 'register' ? 'hover' : ''}`}
          onClick={this.tabClick.bind(this, 'register')}
        >注册</div>
      </div>
    );
  }

  renderLogin() {
    const { isLogin } = this.state;
    return (
      <div className="login">
        <div className="field">
          <span>用户名:</span>
          <Input
            controls
            placeholder="请输入用户名"
            onChange={(target, value) => {
              this.inputChange({ loginName: value })
            }}
          />
        </div>
        <div className="field">
          <span>密码:</span>
          <Password
            placeholder="请输入密码"
            controls
            onChange={(target, value) => {
              this.inputChange({ loginPassword: value });
            }}
          />
        </div>
        <div className="field">
          <Button
            loading={isLogin ? 1 : 0}
            onClick={this.clickLogin}
          >登录</Button>
        </div>
      </div>
    );
  }

  renderRegister() {
    const { isRegister } = this.state;
    return (
      <div className="register">
        <div className="field">
          <span>用户名:</span>
          <Input
            controls
            placeholder="请输入用户名"
            onChange={(target, value) => {
              this.inputChange({ registerName: value })
            }}
          />
        </div>
        <div className="field">
          <span>密码:</span>
          <Password
            controls
            placeholder="请输入密码"
            onChange={(target, value) => {
              this.inputChange({ registerPassword: value })
            }}
          />
        </div>
        <div className="field">
          <span>确认密码:</span>
          <Password
            controls
            placeholder="请确认密码"
            onChange={(target, value) => {
              this.inputChange({ registerConfirm: value })
            }}
          />
        </div>
        <div className="field">
          <Button
            loading={isRegister ? 1 : 0}
            onClick={this.clickRegister}
          >注册</Button>
        </div>
      </div>
    );
  }

  render() {
    const { type } = this.state;
    const { userId } = this.props.userStore;
    if (userId) {
      history.replace('/')
    }
    return (
      <div className="container">
        {this.renderTab()}
        <div className="wrapper">
          <div className={`content-wrap ${type}`}>
            {this.renderLogin()}
            {this.renderRegister()}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
