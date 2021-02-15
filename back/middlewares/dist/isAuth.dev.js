"use strict";

var jwt = require('jsonwebtoken');

var isAuth = function isAuth(req, res, next) {
  var bearer, token;
  return regeneratorRuntime.async(function isAuth$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          bearer = req.headers['authorization'];

          if (!bearer) {
            _context2.next = 5;
            break;
          }

          token = bearer.split(' ')[1];
          _context2.next = 7;
          break;

        case 5:
          console.log({
            __filename: __filename,
            error: 'bearer token invalid'
          });
          return _context2.abrupt("return", res.status(400).json({
            __filename: __filename,
            error: 'bearer token invalid'
          }));

        case 7:
          jwt.verify(token, process.env.SECRET, function _callee(err, decoded) {
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!err) {
                      _context.next = 9;
                      break;
                    }

                    _context.t0 = err.name;
                    _context.next = _context.t0 === 'TokenExpiredError' ? 4 : _context.t0 === 'JsonWebTokenError' ? 5 : 6;
                    break;

                  case 4:
                    return _context.abrupt("return", res.status(401).json(err));

                  case 5:
                    return _context.abrupt("return", res.status(403).json(err));

                  case 6:
                    return _context.abrupt("return", res.status(400).json(err));

                  case 7:
                    _context.next = 11;
                    break;

                  case 9:
                    req.id = decoded.id;
                    next();

                  case 11:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports = isAuth;