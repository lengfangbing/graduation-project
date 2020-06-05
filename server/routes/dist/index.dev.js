"use strict";

var router = require('koa-router')();

var fs = require('fs');

var path = require('path');

var mongo = require('../config/mongodb');

var userRouter = require('./user');

var invitationRouter = require('./invitation');

var adminRouter = require('./admin');

router.get('/', function _callee(ctx) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ctx.body = fs.readFileSync(path.join(__dirname, '../../index.html')).toString();

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});

module.exports = function (app) {
  userRouter(router, mongo);
  invitationRouter(router, mongo);
  adminRouter(router, mongo);
  app.use(router.routes(), router.allowedMethods());
};