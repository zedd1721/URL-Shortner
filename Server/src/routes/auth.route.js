import express from 'express';
import { login, register, logout, getUser } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout);
router.get('/me', authMiddleware, getUser)


export default router;