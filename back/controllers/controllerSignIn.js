const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const { user } = require('../models');
const generateToken = require('../utils/generateToken');

const controllerSignIn = async (req, res) => {
  let { email, password } = req.body;

  try {
    const currentUser = await user.findOne({
      where: {
        email,
      },
    });

    if (!currentUser) {
      console.log({ __filename, error: 'User not found' });
      return res.status(400).json({ __filename, error: 'User not found' });
    }

    const hashedPassword = currentUser.password;

    const isCorrectPassword = await bcrypt.compare(password, hashedPassword);

    if (!isCorrectPassword) {
      console.log({ __filename, error: 'Wrong password' });
      return res
        .status(400)
        .json({ __filename, error: 'Wrong email or password' });
    }

    const id = currentUser.id;

    const accessToken = await generateToken(id);
    const refreshToken = await generateToken(id, true);

    user.update(
      { refreshToken },
      {
        where: {
          id,
        },
      }
    );

    return res.status(StatusCodes.OK).json({ accessToken, refreshToken });
  } catch (error) {
    console.log({ __filename, error });
    return res.status(400).json({ __filename, error });
  }
};

module.exports = controllerSignIn;
