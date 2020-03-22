const path = require('path');
const Koa = require("koa");
const app = new Koa();
const useRouter = require('./routes/index');
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
app.use(static(path.join(__dirname, '../')));
app.use(body({
  multipart: true
}));
useRouter(app);
app.listen(3000, () => {
  console.log('server is running at 3000');
})