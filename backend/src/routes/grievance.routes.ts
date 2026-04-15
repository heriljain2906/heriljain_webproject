import { Router } from 'express';
import { createComplaint, getMyComplaints, getAllComplaints } from '../controllers/grievance.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authenticate, createComplaint);
router.get('/my', authenticate, getMyComplaints);
router.get('/all', authenticate, getAllComplaints); // Usually protected by Admin, simplified for now

export default router;
