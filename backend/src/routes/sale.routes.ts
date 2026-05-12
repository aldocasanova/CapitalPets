import { Router } from 'express';
import { SaleController } from '../controllers/sale.controller.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();
const controller = new SaleController();

// All sale routes require admin
router.get('/', authenticate, requireAdmin, (req, res, next) => controller.findAll(req, res, next));
router.get('/dashboard', authenticate, requireAdmin, (req, res, next) => controller.dashboard(req, res, next));
router.get('/:id', authenticate, requireAdmin, (req, res, next) => controller.findById(req, res, next));
router.post('/', authenticate, requireAdmin, (req, res, next) => controller.create(req, res, next));

export default router;
