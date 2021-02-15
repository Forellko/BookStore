const jwt = require('jsonwebtoken');
const util = require('util');

const signTokenPromisify = util.promisify(jwt.sign);

const generateToken = async (id, isRefresh = false) => {
  try {
    const token = await signTokenPromisify({ id }, process.env.SECRET, {
      expiresIn: isRefresh
        ? +process.env.REFRESH_TIME
        : +process.env.ACCESS_TIME,
    });
    return token;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

module.exports = generateToken;
