const { StatusCodes } = require('http-status-codes');

const controllerSignIn = (req, res) => {
  res.status(StatusCodes.OK).send('sign in');
};

module.exports = controllerSignIn;
