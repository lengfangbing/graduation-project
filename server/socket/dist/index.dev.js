"use strict";

module.exports = function (server) {
  var io = require('socket.io')(server);

  io.on('connection', function (socket) {
    socket.emit('open'); //通知客户端已连接

    console.log('connected'); //监听disconnect事件

    socket.on('disconnect', function () {
      console.log('disconnect');
    });
    socket.on('reply', function (data) {
      //广播向所有socket连接
      socket.broadcast.emit('receive', data); //给自己也发一份

      socket.emit('receive', data);
    });
  });
};