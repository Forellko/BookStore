const { StatusCodes } = require('http-status-codes');

const controllerSingUp = (req, res) => {
  res.status(StatusCodes.OK).send('sign up');
};

module.exports = controllerSingUp;
