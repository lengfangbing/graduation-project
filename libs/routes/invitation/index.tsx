import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import io from 'socket.io-client';
import Item from './item';
import './index.less';

interface Props {
	listStore?: any
	userStore?: any
}
interface State{
	list: any[]
}
@inject('listStore', 'userStore')
@observer
class Invitation extends Component<Props, State>{
  socket: any;
	constructor(props) {
		super(props);
		this.state = {
			list: []
		}
	}

	componentDidMount(){
		this.getList();
    this.initSocket();
	}

	getList(){
		const { getList } = this.props.listStore;
		getList()
			.then(res => {
				if(res){
					this.setState({
						list: res
					})
				}
			})
	}

  initSocket(){
    //建立websocket连接
    const socket = io('http://127.0.0.1:3000');
    this.socket = socket;

    //收到server的连接确认
    socket.on('open', () => {
        console.log('socket io is open !');
    });
    socket.on('receive', data => {
      const { invitationId } = data;
      const { list } = this.state;
      const _list = list.map(val => {
        if(val.invitationId === invitationId){
          const commets = val.commets;
          commets.push(data);
          return {
            ...val,
            commets
          }
        }
      });
      this.setState({
        list: _list
      });
    })
  }

	sendCommet(config, reply){
		const { postCommet } = this.props.listStore;
		const { userId, userName } = this.props.userStore;
		const { invitationId, authorId } = config;
		if(!userId){
			// @ts-ignore
			return window.showToast({title: '请先登录'});
		}
		postCommet({
			user: userName,
			invitationId: invitationId,
			authorId: authorId,
			userId,
			reply
		})
			.then(res => {
        this.socket.emit('reply',res);
			})
	}

  updateList(data){
  }

	replyClick(reply, config){
		this.sendCommet(config, reply);
	}

	render() {
		const { list } = this.state;
		return (
			<div className='invitation'>
				<div className="invitation-wrapper">
					{
						list.map(val => {
							return (
								<Item
									key={val.invitationId}
									config={{
										title: `${val.title}  -- ${val.author}`,
										html: val.content,
										id: val.invitationId,
                    commets: val.commets
									}}
									onClick={(reply) => this.replyClick(reply, val)}
								/>
							);
						})
					}
				</div>
			</div>
		);
	}

}
export default Invitation;
