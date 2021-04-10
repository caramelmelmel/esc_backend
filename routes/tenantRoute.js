const express = require('express');
const router = express.Router();

const tenantctrller = require('../controllers/tenantController');
const vAuth = require('../middleware/verifyAuthTenant');

//tenantctrller.createTenant();
console.log("success");
router.post('/signup',tenantctrller.createTenant);
router.post('/signin',tenantctrller.signinTenant);

module.exports = router;
