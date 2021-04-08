const dotenv = require('dotenv');
const jsonwt =  require('jsonwebtoken');
const bcrypt = require('bcrypt')
dotenv.config();

/**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
const isValidEmail = (email) => {
  const regEx = /^\w{0,}@singhealth\.com\.sg$/;
  return regEx.test(email);
};

/**
   * validatePassword helper method
   * @param {string} password
   * @returns {Boolean} True or False
   */
const validatePassword = (password) => {

  //filter the regex password
  if (password.length <= 8 || password === '') {
    return false;
  }
   return true;
};
/**
   * isEmpty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
  if (input.replace(/\s/g, '').length) {
    return false;
  } return true;
};

/**
   * empty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const empty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
};

//using jwt for auth 
//payload here is the user object
const generateUserToken = (email, id, is_admin, first_name, last_name) => {
  const token = jsonwt.jwt.sign({
    email,
    user_id: id,
    is_admin,
    first_name,
    last_name,
  },
  process.env.secret, { expiresIn: '3d' });
  return token;
};

const saltRounds = 10;
//hash the password using bcrypt 
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt);

//compare password 
const comparePassword =(hashedPassword,password)=>{
  return bcrypt.compareSync(password, hashedPassword);
}

module.exports= {
  isValidEmail,
  validatePassword,
  isEmpty,
  empty,
  generateUserToken,
  hashPassword
};