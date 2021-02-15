const express = require('express');
const controllerMainPage = require('../controllers/controllerMainPage');

const routerMainPage = express.Router();

routerMainPage.get('/main', controllerMainPage);

module.exports = routerMainPage;
