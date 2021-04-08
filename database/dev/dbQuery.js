//a fn to query from the pg database 
const pool = require('./pool');
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   */
function query(quertText, params){
    return new Promise((resolve, reject) => {
      pool.query(quertText, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  module.exports = query;