const webtoken = require('jsonwebtoken');

const stats = require('../helpers/status');

const dotenv = require('dotenv')

dotenv.config();

/**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */

const verifyToken = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    stats.errorMessage.error = 'Token not provided';
    return res.status(stats.status.bad).send(stats.errorMessage);
  }
  try {
    const decoded =  webtoken.jwt.verify(token, process.env.SECRET);
    req.user = {
      email: decoded.email,
      user_id: decoded.user_id,
      is_admin: decoded.is_admin,
      name: decoded.name,
    };
    next();
  } catch (error) {
      //auth failed sending message now
    stats.errorMessage.error = 'Authentication Failed';
    return res.status(stats.status.unauthorized).send(errorMessage);
  }
};

module.exports =  verifyToken;