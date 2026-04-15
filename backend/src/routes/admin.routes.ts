import { Router } from 'express';
import { getAllUsers, getDashboardStats, updateComplaintPriority, updateComplaintStatus } from '../controllers/admin.controller';
import { authenticate, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

router.get('/users', authenticate, requireAdmin, getAllUsers);
router.get('/stats', authenticate, requireAdmin, getDashboardStats);
router.put('/complaints/:id/priority', authenticate, requireAdmin, updateComplaintPriority);
router.put('/complaints/:id/status', authenticate, requireAdmin, updateComplaintStatus);

export default router;
