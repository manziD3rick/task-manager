import express from 'express';
import { requireAuth } from '../middleware/requireAuth.js';
import { getStats, downloadCSV } from '../controllers/reportController.js';

const router = express.Router();

router.use(requireAuth);

router.get('/',    getStats);
router.get('/csv', downloadCSV);

export default router;
