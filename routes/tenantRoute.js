const express = require('express');
const router = express.Router();

const tenantctrller = require('../controllers/tenantController');
const vAuth = require('../middleware/verifyAuth');

//tenantctrller.createTenant();
console.log("success");
router.post('/signup',tenantctrller.createTenant);
router.post('/signin',tenantctrller.signinTenant);
//router.post('',vAuth.verifyTenant,)

module.exports = router;
