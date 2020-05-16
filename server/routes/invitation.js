const fs = require('fs');
const path = require('path');
module.exports = (router, mongo) => {
  router.get('/initList', async ctx => {

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
}