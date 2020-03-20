const router = require('koa-router')();
const fs = require('fs');
const path = require('path');
router.get('/', async ctx => {
  ctx.body = fs.readFileSync(path.join(__dirname, '../../index.html')).toString();
})
module.exports = router;