const { StatusCodes } = require('http-status-codes');
const express = require('express');
const router = express.Router();
const fs = require('fs');

fs.readdirSync(__dirname).forEach((routerFileName) => {
  if (routerFileName === 'index.js') return;
  const currentRouter = require(`./${routerFileName}`);
  router.use('/', currentRouter);
});

module.exports = router;
