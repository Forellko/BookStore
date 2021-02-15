const { StatusCodes } = require('http-status-codes');

const controllerMainPage = (req, res) => {
  res.status(StatusCodes.OK).send('main');
};

module.exports = controllerMainPage;
