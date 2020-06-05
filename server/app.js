const path = require('path');
const Koa = require("koa");
const app = new Koa();
const Event = require('events').EventEmitter;
const useRouter = require('./routes/index');
const cors = require("koa2-cors");
const static = require('koa-static');
const body = require('koa-body');
const server = require('http').createServer(app.callback());
const socket = require('./socket');
const emitter = new Event();
socket(server, emitter);
const port = 3000;
app.use(
  cors({
    origin: function(ctx) {
      return '*';
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
  jsonLimit: 1000000000,
  formidable: {
    maxFieldsSize: 1000 * 1024 * 1024
  }
}));
useRouter(app, emitter);
server.listen(port, () => {
  console.log('server is running at 3000');
})
