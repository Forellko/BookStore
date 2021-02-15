const express = require('express');
const controllerSingUp = require('../controllers/controllerSingUp');

const routerSignUp = express.Router();

routerSignUp.post('/signup', controllerSingUp);

module.exports = routerSignUp;
