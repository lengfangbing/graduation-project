const fs = require('fs');
const path = require('path');
module.exports = (router, mongo) => {
  router.get('/getList', async ctx => {
		const res = await mongo.findInTable('invitation', {
			status: 1
		});
		if (res.status) {
			ctx.body = {
				code: 1,
				data: res.body
			}
    } else {
      ctx.body = {
        code: 0
      }
    }
	});
	router.get('/getMyList', async ctx => {
		const { userId } = ctx.query;
		const res = await mongo.findInTable('invitation', {
			authorId: userId
		});
		if (res.status) {
			ctx.body = {
				code: 1,
				data: res.body
			}
    } else {
      ctx.body = {
        code: 0
      }
    }
	});
	router.post('/publish', async ctx => {
		const { title, content, author, authorId } = ctx.request.body;
		const id = new Date().getTime();
		const res = await mongo.insert('invitation',{
			title, content, author, authorId,
			invitationId: id,
			status: 0
		});
		if (res.status) {
      ctx.body = {
        code: 1,
        message: '发帖成功, 等待管理员审核'
      }
    } else {
      ctx.body = {
        code: 0,
        message: '发帖失败, 标题重复'
      }
    }
	});
	router.post('/reply', async ctx => {
		const { invitationId, authorId, userId, reply, user } = ctx.request.body;
		const res = await mongo.insert('commet', {
			invitationId, authorId, userId, reply, user
		});
		if (res.status) {
      ctx.body = {
        code: 1,
				message: '回帖成功',
				data: {
					user,
					reply
				}
      }
    } else {
      ctx.body = {
        code: 0,
        message: '回帖失败, 网络错误'
      }
    }
	});
}