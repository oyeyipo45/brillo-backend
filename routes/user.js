import express from 'express';
const router = express.Router();
import { registerUser } from '../controllers/user';

router.route('/register').post(registerUser).get(protect, admin, registerUser);


export default router;