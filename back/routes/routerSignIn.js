const express = require('express');
const controllerSignIn = require('../controllers/controllerSignIn');

const routerSignIn = express.Router();

routerSignIn.post('/signin', controllerSignIn);

module.exports = routerSignIn;
