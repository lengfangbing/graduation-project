const fs = require('fs');
const path = require('path');
module.exports = (router, mongo) => {
  router.get('/getList', async ctx => {
    const res = await mongo.findInTable('invitation', {
      status: 1
    });
    let result = [];
    const promises = res.body.map(async value => {
      const commets = await mongo.findInTable('commet', {
        invitationId: value.invitationId
      });
      let _res = {
        status: value.status,
        title: value.title,
        content: value.content,
        author: value.author,
        authorId: value.authorId,
        invitationId: value.invitationId
      };
      _res.commets = commets.body;
      result.push(_res);
    });
    await Promise.all(promises);
    if (res.status) {
      ctx.body = {
        code: 1,
        data: result
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
    let result = [];
    const promises = res.body.map(async value => {
      const commets = await mongo.findInTable('commet', {
        invitationId: value.invitationId
      });
      let _res = {
        status: value.status,
        title: value.title,
        content: value.content,
        author: value.author,
        authorId: value.authorId,
        invitationId: value.invitationId
      };
      _res.commets = commets.body;
      result.push(_res);
    });
    await Promise.all(promises);
    if (res.status) {
      ctx.body = {
        code: 1,
        data: result
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
    const res = await mongo.insert('invitation', {
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
          reply,
          invitationId,
          authorId,
          userId
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