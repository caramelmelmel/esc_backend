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

function getResult(sql,params,callback){
  pool.query(sql,[params],(err,results)=>{
    console.log(results);
    if(!err){
      callback(results);
    }
    else{
      callback(null)
    }
  })
}
//return arr for sel command
function findthings(quertText, params){
  return new Promise((resolve, reject) => {
    getResult(quertText,[params],(result)=>{
      if (result.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    })
  });
}





//define the new select query for each of the tables when creating the tenant
module.exports = {query,findthings}