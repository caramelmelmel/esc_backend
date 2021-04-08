const express = require('express');
const router = express.Router();

const tenantctrller = require('../controllers/tenantController');
const vAuth = require('../middleware/verifyAuth');

//tenantctrller.createTenant();
console.log("success");
router.post('/tenant/signup',tenantctrller.createTenant);

module.exports = router;

