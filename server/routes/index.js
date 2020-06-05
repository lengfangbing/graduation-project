const router = require('koa-router')();
const fs = require('fs');
const path = require('path');
const mongo = require('../config/mongodb');
const userRouter = require('./user');
const invitationRouter = require('./invitation');
const adminRouter = require('./admin');
router.get('/', async ctx => {
  ctx.body = fs.readFileSync(path.join(__dirname, '../../index.html')).toString();
})
module.exports = (app, emitter) => {
  userRouter(router, mongo);
  invitationRouter(router, mongo);
  adminRouter(router, mongo, emitter);
  app.use(router.routes(), router.allowedMethods());
};