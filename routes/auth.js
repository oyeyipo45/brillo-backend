import express from 'express';
const router = express.Router();
import { registerUser, confirmEmail } from '../controllers/auth.js';

router.route('/register').post(registerUser).get(registerUser);
router.get('/confirm_signup/:confirmToken', confirmEmail);


export default router;