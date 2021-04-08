import express from 'express';

import { createAdmin, updateUserToAdmin } from '../controllers/adminController';
import verifyAuth from '../middlewares/verifyAuth';

const express = express();
const router = express.Router();

const staffctrller = require('../controllers/staffController');

router.post('/staffsignup',verifyAuth,staffctrller);
