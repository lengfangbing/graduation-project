"use strict";

var fs = require('fs');

var path = require('path');

module.exports = function (router, mongo, event) {
  router.get('/admin/checkList', function _callee(ctx) {
    var res;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(mongo.findInTable('invitation', {
              status: 0
            }));

          case 2:
            res = _context.sent;

            if (res.status) {
              ctx.body = {
                code: 1,
                data: res.body
              };
            } else {
              ctx.body = {
                code: 0,
                message: '发帖失败, 标题重复'
              };
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  router.post('/admin/accept', function _callee2(ctx) {
    var invitationId, res;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            invitationId = ctx.request.body.invitationId;
            _context2.next = 3;
            return regeneratorRuntime.awrap(mongo.updateOne('invitation', {
              invitationId: invitationId
            }, {
              status: 1
            }));

          case 3:
            res = _context2.sent;

            if (res.status) {
              ctx.body = {
                code: 1,
                message: '审核通过~'
              };
            } else {
              ctx.body = {
                code: 0,
                message: '网络错误'
              };
            }

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  router.post('/admin/reject', function _callee3(ctx) {
    var invitationId, res;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            invitationId = ctx.request.body.invitationId;
            _context3.next = 3;
            return regeneratorRuntime.awrap(mongo.updateOne('invitation', {
              invitationId: invitationId
            }, {
              status: 2
            }));

          case 3:
            res = _context3.sent;

            if (res.status) {
              ctx.body = {
                code: 1,
                message: '审核驳回!'
              };
            } else {
              ctx.body = {
                code: 0,
                message: '网络错误'
              };
            }

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  router.post('/autoCheck', function _callee4(ctx) {
    var _ctx$request$body, invitationId, status, authorId, res;

    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // java自动审核完成后返回的json数据
            _ctx$request$body = ctx.request.body, invitationId = _ctx$request$body.invitationId, status = _ctx$request$body.status, authorId = _ctx$request$body.authorId;
            _context4.next = 3;
            return regeneratorRuntime.awrap(mongo.updateOne('invitation', {
              invitationId: +invitationId
            }, {
              status: +status
            }));

          case 3:
            res = _context4.sent;

            if (res.status) {
              globalThis.socket.emit('auto', {
                status: status,
                invitationId: invitationId,
                authorId: authorId
              });
              globalThis.socket.emit('refresh'); //给自己也发一份

              globalThis.socket.broadcast.emit('refresh');
            }

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
};