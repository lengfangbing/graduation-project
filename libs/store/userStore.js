import { observable, action } from 'mobx';
import { fetchAPI } from '@/utils';

class UserStore{
	@observable userId = 110;
	@observable userName = 'admin';
	@observable userAuth = 1;
	@observable password = 'admin'

	@action.bound
	setUserId(v){
		this.userId = v;
	}

	@action.bound
	setUserName(v){
		this.userName = v;
	}

	@action.bound
	setUserAuth(v){
		this.userAuth = v;
	}

	@action.bound
	setPassword(val){
		this.password = val;
	}

  @action.bound
  postLogin(params){
    const { setUserId, setUserName, setUserAuth, setPassword } = this;
    return fetchAPI('http://127.0.0.1:3000/login', {
			method: 'POST',
			data: params
		})
      .then(res => {
        alert(res.message)
        if(res.code){
          const { data } = res;
          const { userName, userId, password, userAuth } = data;
          setUserId(userId)
          setUserName(userName)
          setUserAuth(userAuth)
          setPassword(password)
        }
        return res;
      })
      .catch((e) => {
        alert('网络错误')
        Promise.reject();
      });
  }

  @action.bound
  postRegister(params){
		const { setUserId, setUserName, setUserAuth, setPassword } = this;
    return fetchAPI('http://127.0.0.1:3000/register', {
			method: 'POST',
			data: params
		})
      .then(res => {
        alert(res.message)
        if(res.code){
          const { data } = res;
          const { userName, userId, password, userAuth } = data;
          setUserId(userId)
          setUserName(userName)
          setUserAuth(userAuth)
          setPassword(password)
        }
        return res;
      })
      .catch((e) => {
				console.log(e)
        alert('网络错误')
        Promise.reject()
      })
  }

  @action.bound
  postEdit(params){
    const { setUserName, setPassword } = this;
    return fetchAPI('http://127.0.0.1:3000/edit', {
      method: 'POST',
      data: params
    })
      .then(res => {
        alert(res.message)
        if(res.code){
          const { data } = res;
          const { name, password } = data;
          setUserName(name)
          setPassword(password)
        }
        return res;
      })
      .catch(() => {
        alert('网络错误')
        Promise.reject()
      })
  }
}

export default new UserStore();