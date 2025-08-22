import { Router } from 'express';
import { prisma } from '../index';

const router = Router();

// Placeholder routes - authentication middleware would be added here
router.get('/', async (req, res) => {
  res.json({ message: 'Users endpoint - authentication required' });
});

export default router;