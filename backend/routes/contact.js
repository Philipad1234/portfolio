import { Router } from 'express';
import { submissionPost } from '../controllers/contactController.js';

const router = Router();

router.post('/', submissionPost)

export default router;