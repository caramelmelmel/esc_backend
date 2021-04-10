
const express = require('express');
const router = express.Router();

const staffctrller = require('../controllers/staffController');
const staffVerify = require('../middleware/verifyAuthStaff')

//signup and login
router.post('/signup',staffctrller.createStaff);
router.post('/login',staffctrller.signinStaff)

module.exports = router;
