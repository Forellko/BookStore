const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const { user } = require('../models');

const controllerSingUp = async (req, res) => {
  let { email, password } = req.body;

  try {
    password = await bcrypt.hash(password, 3);

    const createdAt = Date.now();
    const updatedAt = createdAt;
    await user.create({
      email,
      password,
      createdAt,
      updatedAt,
    });
  } catch (error) {
    console.log({ __filename, error });
    return res.status(400).json({ __filename, error });
  }
  res.status(StatusCodes.OK).send('sing up');
};

module.exports = controllerSingUp;
