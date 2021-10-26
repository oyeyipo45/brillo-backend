import express from 'express';
const router = express.Router();
import { registerUser } from '../controllers/auth.js';

router.route('/register').post(registerUser).get(registerUser);


export default router;