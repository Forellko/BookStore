const express = require('express');
const controllerProfile = require('../controllers/controllerProfile');
const isAuth = require('../middlewares/isAuth');

const routerProfile = express.Router();

routerProfile.get('/profile', isAuth, controllerProfile);

module.exports = routerProfile;
