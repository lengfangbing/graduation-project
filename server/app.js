const path = require('path');
const Koa = require("koa");
const app = new Koa();
const useRouter = require('./routes/index');
const cors = require("koa2-cors");
const static = require('koa-static');
const body = require('koa-body');
const server = require('http').createServer(app.callback());
const socket = require('./socket');
socket(server);
const port = 3000;
app.use(
  cors({
    origin: function(ctx) {
      return "http://127.0.0.1:5000";
    },
    maxAge: 5,
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(static(path.join(__dirname, '../')));
app.use(body({
  multipart: true,
  jsonLimit: 10000000,
  formidable: {
    maxFieldsSize: 1000 * 1024 * 1024
  }
}));
useRouter(app);
server.listen(port, () => {
  console.log('server is running at 3000');
})