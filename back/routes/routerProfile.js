const express = require('express');
const controllerProfile = require('../controllers/controllerProfile');

const routerProfile = express.Router();

routerProfile.get('/profile', controllerProfile);

module.exports = routerProfile;
