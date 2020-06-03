const fs = require('fs');
const path = require('path');
module.exports = (router, mongo) => {
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
}