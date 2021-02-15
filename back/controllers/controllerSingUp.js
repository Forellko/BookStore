const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const { user } = require('../models');

const controllerSingUp = async (req, res) => {
  let { email, password } = req.body;

  try {
    currentUser = await user.findOne({
      where: {
        email,
      },
    });

    console.log(currentUser);

    if (currentUser) {
      console.log({ __filename, error: 'User already exist' });
      return res.status(400).json({ __filename, error: 'User already exist' });
    }

    password = await bcrypt.hash(password, 3);

    const createdAt = Date.now();
    const updatedAt = createdAt;
    await user.create({
      email,
      password,
      createdAt,
      updatedAt,
    });

    const accessToken = generateToken(currentUser.id);
    const refreshToken = generateToken(currentUser.id, true);

    return res.status(StatusCodes.OK).json({ accessToken, refreshToken });
  } catch (error) {
    console.log({ __filename, error });
    return res.status(400).json({ __filename, error });
  }
};

module.exports = controllerSingUp;
