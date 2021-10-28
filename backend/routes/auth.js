import express from 'express';
const router = express.Router();
import { registerUser, confirmEmail, login } from '../controllers/auth.js';

router.post('/register', registerUser);
router.get('/confirm_signup/:confirmToken', confirmEmail);
router.post('/login', login);


export default router;