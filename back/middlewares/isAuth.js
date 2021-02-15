const jwt = require('jsonwebtoken');

const isAuth = async (req, res, next) => {
  const bearer = req.headers['authorization'];

  let token;
  if (bearer) {
    token = bearer.split(' ')[1];
  } else {
    console.log({ __filename, error: 'bearer token invalid' });
    return res.status(400).json({ __filename, error: 'bearer token invalid' });
  }

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      switch (err.name) {
        case 'TokenExpiredError':
          return res.status(401).json(err);
        case 'JsonWebTokenError':
          return res.status(403).json(err);
        default:
          return res.status(400).json(err);
      }
    } else {
      req.id = decoded.id;
      next();
    }
  });
};

module.exports = isAuth;
