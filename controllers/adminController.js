const moment = require('moment');
const dbQ = require('../db/dev/dbQuery');

const stats = require('../helpers/status');

const val = require('../helpers/validations');

//needed from front end
const createAdmin = async (req, res) => {
    const {
      email, name, password, 
    } = req.body;
  
    const { is_admin } = req.user;
  
    const isAdmin = true;
    const created_on = moment(new Date());
  
    if (!is_admin === false) {
      errorMessage.error = 'Sorry You are unauthorized to create an admin';
      return res.status(status.bad).send(errorMessage);
    }
  
    if (isEmpty(email) || isEmpty(first_name) || isEmpty(last_name) || isEmpty(password)) {
      errorMessage.error = 'Email, password, first name and last name field cannot be empty';
      return res.status(status.bad).send(errorMessage);
    }
    if (!isValidEmail(email)) {
      errorMessage.error = 'Please enter a valid Email';
      return res.status(status.bad).send(errorMessage);
    }
    if (!validatePassword(password)) {
      errorMessage.error = 'Password must be more than 8 characters';
      return res.status(status.bad).send(errorMessage);
    }
    const hashedPassword = hashPassword(password);
    const createAdminQuery = `INSERT INTO
        users(email, name, password, created_on)
        VALUES($1, $2, $3, $4)
        returning *`;
    const values = [
      email,
      name,
      hashedPassword,
      created_on,
    ];
  
    try {
      const { rows } = await dbQuery.query(createAdminQuery, values);
      const dbResponse = rows[0];
      delete dbResponse.password;
      const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.is_admin, dbResponse.first_name, dbResponse.last_name);
      successMessage.data = dbResponse;
      successMessage.data.token = token;
      return res.status(status.created).send(successMessage);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        errorMessage.error = 'Admin with that EMAIL already exist';
        return res.status(status.conflict).send(errorMessage);
      }
    }
  };