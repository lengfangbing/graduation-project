const fs = require('fs');
const path = require('path');
module.exports = (router, mongo, event) => {
  router.get('/admin/checkList', async ctx => {
		const res = await mongo.findInTable('invitation', {
			status: 0
		});
		if (res.status) {
			ctx.body = {
				code: 1,
				data: res.body
			}
    } else {
      ctx.body = {
        code: 0,
        message: '发帖失败, 标题重复'
      }
    }
	});
	router.post('/admin/accept', async ctx => {
		const { invitationId } = ctx.request.body;
		const res = await mongo.updateOne('invitation', {
			invitationId
		}, {
			status: 1
		});
		if (res.status) {
			ctx.body = {
				code: 1,
				message: '审核通过~'
			}
    } else {
      ctx.body = {
        code: 0,
        message: '网络错误'
      }
    }
	});
	router.post('/admin/reject', async ctx => {
		const { invitationId } = ctx.request.body;
		const res = await mongo.updateOne('invitation', {
			invitationId
		}, {
			status: 2
		});
		if (res.status) {
			ctx.body = {
				code: 1,
				message: '审核驳回!'
			}
    } else {
      ctx.body = {
        code: 0,
        message: '网络错误'
      }
    }
	});
	router.post('/autoCheck', async ctx => {
		// java自动审核完成后返回的json数据
    const { invitationId, status, authorId } = ctx.request.body;
    const res = await mongo.updateOne('invitation', {
      invitationId: +invitationId
    }, {
      status: +status
    });
    if (res.status) {
      globalThis.socket.emit('auto', {status, invitationId, authorId});
      globalThis.socket.emit('refresh');//给自己也发一份
      globalThis.socket.broadcast.emit('refresh'); 
    }
	});
}
