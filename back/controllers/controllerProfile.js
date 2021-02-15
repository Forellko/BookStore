const { StatusCodes } = require('http-status-codes');

const controllerProfile = async (req, res) => {
  res.status(StatusCodes.OK).send('profile');
};

module.exports = controllerProfile;
