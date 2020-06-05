const fs = require('fs');
const path = require('path');
const request = require('superagent');

function getUtcTime(){
  return Date.now()
}
function getTime(){
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
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
      status: 0,
      utcTime: getUtcTime(),
      time: getTime()
    });
    if (res.status) {
      // 发送请求给java后端, 去自动审核
      request
        .post('http://127.0.0.1:8080/publish')
        .send({
          invitationId: String(id),
          status: 0,
          title,
          content
        })
        .end();
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
      invitationId, authorId, userId, reply, user,
      utcTime: getUtcTime(),
      time: getTime()
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
