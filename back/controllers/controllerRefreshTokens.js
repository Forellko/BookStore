const { StatusCodes } = require('http-status-codes');
const { user } = require('../models');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');

const controllerRefreshTokens = async (req, res) => {
  let { refreshToken } = req.body;

  try {
    const { id } = await jwt.verify(refreshToken, process.env.SECRET);

    const currentUser = await user.findOne({
      where: {
        refreshToken,
      },
    });

    if (!currentUser) {
      console.log({ __filename, error: 'wrong refresh' });
      return res.status(403).json({ __filename, error: 'relogin' });
    }

    const accessToken = await generateToken(id);
    refreshToken = await generateToken(id, true);

    user.update(
      { refreshToken },
      {
        where: {
          id,
        },
      }
    );

    res.status(StatusCodes.OK).json({ accessToken, refreshToken });
  } catch (error) {
    console.log({ __filename, error });
    return res.status(400).json({ __filename, error });
  }
};

module.exports = controllerRefreshTokens;
