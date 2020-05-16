module.exports = (router, mongo) => {
  router.post('/register', async ctx => {
    const { registerName, registerPassword } = ctx.request.body;
    const id = new Date().getTime();
    const res = await mongo.insert('user', {
      name: registerName,
      password: registerPassword,
      auth: 0,
      userId: id
    });
    if (res.status) {
      ctx.body = {
        code: 1,
        message: '注册并登录成功',
        data: {
          userName: registerName,
          userId: id,
          password: registerPassword,
          userAuth: 0
        }
      }
    } else {
      ctx.body = {
        code: 0,
        message: '注册失败, 用户名重复'
      }
    }
  });
  router.post('/login', async ctx => {
    const { loginName, loginPassword } = ctx.request.body;
    const res = await mongo.findInTable('user', { name: loginName });
    const body = res.body;
    const data = body[0];
    if (body.length) {
      if (data.password !== loginPassword) {
        ctx.body = {
          code: 0,
          message: '登录失败, 用户名密码不匹配'
        }
      } else {
        ctx.body = {
          code: 1,
          message: '登录成功',
          data: {
            userName: loginName,
            userId: data.userId,
            password: loginPassword,
            userAuth: data.auth
          }
        }
      }
    } else {
      ctx.body = {
        code: 0,
        message: '登录失败, 不存在此用户名'
      }
    }
  })
  router.post('/edit', async ctx => {
    const { userId, name, password } = ctx.request.body;
    const res = await mongo.updateOne('user', { userId }, { name, password }, { sort: { userId: 1 } });
    if (res.status) {
      const { body: { name } } = res;
      ctx.body = {
        code: 1,
        message: '更新成功',
        data: {
          name,
          userId,
          password
        }
      }
    } else {
      ctx.body = {
        code: 0,
        message: '查不到userId'
      }
    }
  })
}