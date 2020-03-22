const router = require('koa-router')();
const fs = require('fs');
const path = require('path');
const mongo = require('../config/mongodb');
router.get('/', async ctx => {
  ctx.body = fs.readFileSync(path.join(__dirname, '../../index.html')).toString();
})
module.exports = (app) => {
  app.use(router.routes(), router.allowedMethods());
};