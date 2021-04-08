const moment = require('moment');

//import dbQuery from '../db/dev/dbQuery';
const dbQ = require('../database/dev/dbQuery')

const validate = require('../helpers/validations');
const stats = require('../helpers/status')
const poolconfig = require('../config/database').pool;

//use the pg pool library 
const Pool = require('pg').Pool;
const pool = new Pool(poolconfig)


/**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */

//tenant table here
  /**
   CREATE TABLE tenant(
    tenant_id serial PRIMARY KEY, 
    tenant_name varchar(50),
    category_ID integer,
    store_des VARCHAR(250),
    email TEXT UNIQUE NOT NULL,
    CONSTRAINT fk_cat
    FOREIGN KEY(category_ID)
        REFERENCES category(category_ID)
        ON DELETE CASCADE
    , 
    expiry_date date,
    password varchar(100),
    store_id integer references stores,
    inst_id integer references singhealth_institutions
);
   */

const createTenant = async (req,res)=>{

    console.log("inside createTenant");

    //get from front end
    console.log(req.body);
    // const {
    //     tenant_name,category,store_des,email,expiry_date,password,store_name,institution_name
    // } = req.body;
    

    console.log("before created_on");

    const created_on = moment(new Date());
    if (validate.isEmpty(req.body.email) || validate.isEmpty(req.body.tenant_name) || validate.isEmpty(req.body.category) || validate.isEmpty(req.body.password) || validate.isEmpty(req.body.store_des)|| validate.isEmpty(req.body.expiry_date)||validate.isEmpty(req.body.store_name)||validate.isEmpty(req.body.institution_name)) {
        stats.errorMessage.error = 'All the fields must be filled in';
        return res.status(stats.status.bad).send(stats.errorMessage);
      }
      if (!validate.isValidEmail(req.body.email)) {
        stats.errorMessage.error = 'Please enter a valid Email';
        return res.status(stats.status.bad).send(stats.errorMessage);
      }
      if (!validate.validatePassword(req.body.password)) {
        stats.errorMessage.error = 'Password must be more than 8 characters';
        return res.status(stats.status.bad).send(stats.errorMessage);
      }

      console.log("Before password");

      const hashedPassword = hashPassword(req.body.password);

      //select query from other tables
      const selcat = `SELECT * FROM category where category_name = $1 RETURNING category_ID`
      const selInst = `SELECT * FROM singhealth_institutions where institution_name = $1 RETURNING institution_id`
      //get query form
      console.log(` The category id is ${selcat}`);
      console.log(`The institution id is ${selInst}`);


      //query to insert tenant on success
      const createTenantQuery = `INSERT INTO tenant(tenant_name,category_ID, store_des,email, expiry_date,password,store_name,institution_id)
                                values($1, $2, $3, $4, $5, $6, $7, $8) `
      
      const values = [
        req.body.tenant_name,
        req.body.category_ID, 
        req.body.store_des,
        req.body.email,
        req.body.expiry_date,
        req.body.password,
        req.body.store_id,
        req.body.institution_id 
      ]

      values[6] = pool.query(selcat,[req.body.store_name]);
      values[7] = pool.query(selInst,[req.body.institution_name]);

      console.log("BEFORE TRY");

      try {
        const { rows } = await dbQuery.query(createTenantQuery, values);
        const dbResponse = rows[0];
        delete dbResponse.password;
        const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.is_admin, dbResponse.first_name, dbResponse.last_name);
        successMessage.data = dbResponse;
        successMessage.data.token = token;

        return res.status(status.created).send(successMessage);
      } catch (error) {
        if (error.routine === '_bt_check_unique') {
          errorMessage.error = 'User with that EMAIL already exist';
          return res.status(status.conflict).send(errorMessage);
        }
        errorMessage.error = 'Operation was not successful';
        console.log("CATCH");
        return res.status(status.error).send(errorMessage);
      }
    };


    /**
   * Signin
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
const signinTenant = async (req, res) => {
    const { email, password } = req.body;
    if (isEmpty(email) || isEmpty(password)) {
      errorMessage.error = 'Email or Password detail is missing';
      return res.status(status.bad).send(errorMessage);
    }
    if (!isValidEmail(email) || !validatePassword(password)) {
      errorMessage.error = 'Please enter a valid Email or Password';
      return res.status(status.bad).send(errorMessage);
    }

    const signinUserQuery = 'SELECT * FROM tenant WHERE email = $1';
    try {
      const { rows } = await dbQuery.query(signinUserQuery, [email]);
      const dbResponse = rows[0];
      if (!dbResponse) {
        errorMessage.error = 'User with this email does not exist';
        return res.status(status.notfound).send(errorMessage);
      }
      if (!comparePassword(dbResponse.password, password)) {
        errorMessage.error = 'The password you provided is incorrect';
        return res.status(status.bad).send(errorMessage);
      }
      const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.is_admin, dbResponse.first_name, dbResponse.last_name);
      delete dbResponse.password;
      successMessage.data = dbResponse;
      successMessage.data.token = token;
      return res.status(status.success).send(successMessage);
    } catch (error) {
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage);
    }
  };

  module.exports = {
      createTenant,
      signinTenant
  }