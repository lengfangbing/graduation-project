const path = require('path');
const Koa = require("koa");
const app = new Koa();
const indexRouter = require('./routes/index');
const cors = require("koa2-cors");
const static = require('koa-static');
const body = require('koa-body');
app.use(
  cors({
    origin: function(ctx) {
      return "http://localhost:8080";
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 5,
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"]
  })
);
app.use(async (ctx, next) => {
  await next();
})
app.use(static(path.join(__dirname, '../')));
app.use(body({
  multipart: true
}));
app.use(indexRouter.routes(), indexRouter.allowedMethods());
app.listen(3000, () => {
  console.log(3000);
})