import { Router } from 'express';
import { googleAuth, verifyToken } from '../controllers/userController.js';

const router = Router();

router.post('/google', googleAuth);

router.get('/verify', verifyToken);

export default router;
