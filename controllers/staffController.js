const mom = require('moment');

//import dbQuery from '../db/dev/dbQuery';
const dbQ = require('../db/dev/dbQuery')

import {
  hashPassword,
  comparePassword,
  isValidEmail,
  validatePassword,
  isEmpty,
  generateUserToken,
} from '../helpers/validations';

import {
  errorMessage, successMessage, status,
} from '../helpers/status';

const CreateStaff = async()
