
const express = require('express');
const router = express.Router();

const staffctrller = require('../controllers/staffController');
const staffVerify = require('../middleware/verifyAuth')

//signup and login
router.post('/signup',staffctrller.createStaff);
router.post('/login',staffctrller.signinStaff);

module.exports = router;
