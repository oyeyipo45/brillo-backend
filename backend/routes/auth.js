import express from 'express';
const router = express.Router();
import { registerUser, confirmEmail, login, forgotPassword } from '../controllers/auth.js';

router.post('/register', registerUser);
router.get('/confirm_signup/:confirmToken', confirmEmail);
router.post('/login', login);
router.put('/forgot-password',forgotPassword);


export default router;