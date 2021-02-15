const express = require('express');
const controllerRefreshTokens = require('../controllers/controllerRefreshTokens');

const routerRefreshTokens = express.Router();

routerRefreshTokens.post('/refresh', controllerRefreshTokens);

module.exports = routerRefreshTokens;
