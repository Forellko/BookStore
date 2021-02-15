"use strict";

var _require = require('http-status-codes'),
    StatusCodes = _require.StatusCodes;

var _require2 = require('../models'),
    user = _require2.user;

var jwt = require('jsonwebtoken');

var generateToken = require('../utils/generateToken');

var controllerRefreshTokens = function controllerRefreshTokens(req, res) {
  var refreshToken, _ref, id, currentUser, accessToken;

  return regeneratorRuntime.async(function controllerRefreshTokens$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          refreshToken = req.body.refreshToken;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(jwt.verify(refreshToken, process.env.SECRET));

        case 4:
          _ref = _context.sent;
          id = _ref.id;
          _context.next = 8;
          return regeneratorRuntime.awrap(user.findOne({
            where: {
              refreshToken: refreshToken
            }
          }));

        case 8:
          currentUser = _context.sent;

          if (currentUser) {
            _context.next = 12;
            break;
          }

          console.log({
            __filename: __filename,
            error: 'wrong refresh'
          });
          return _context.abrupt("return", res.status(403).json({
            __filename: __filename,
            error: 'relogin'
          }));

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(generateToken(id));

        case 14:
          accessToken = _context.sent;
          _context.next = 17;
          return regeneratorRuntime.awrap(generateToken(id, true));

        case 17:
          refreshToken = _context.sent;
          user.update({
            refreshToken: refreshToken
          }, {
            where: {
              id: id
            }
          });
          res.status(StatusCodes.OK).json({
            accessToken: accessToken,
            refreshToken: refreshToken
          });
          _context.next = 26;
          break;

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](1);
          console.log({
            __filename: __filename,
            error: _context.t0
          });
          return _context.abrupt("return", res.status(400).json({
            __filename: __filename,
            error: _context.t0
          }));

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 22]]);
};

module.exports = controllerRefreshTokens;