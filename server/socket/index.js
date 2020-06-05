module.exports = (server, event) => {
  const io = require('socket.io')(server);

  io.on('connection', socket => {
    socket.emit('open'); //通知客户端已连接

    console.log('connected'); //监听disconnect事件

    socket.on('disconnect', () => {
      console.log('disconnect');
    });
    socket.on('reply', data => {
      //广播向所有socket连接
      socket.broadcast.emit('receive', data); //给自己也发一份

      socket.emit('receive', data);
    });
    event.on('checkStatus', (status) => {
      console.log(status);
    })
  });
}; 