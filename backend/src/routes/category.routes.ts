import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();
const controller = new CategoryController();

// Public routes
router.get('/', (req, res, next) => controller.findAll(req, res, next));
router.get('/:id', (req, res, next) => controller.findById(req, res, next));

// Admin routes
router.post('/', authenticate, requireAdmin, (req, res, next) => controller.create(req, res, next));
router.put('/:id', authenticate, requireAdmin, (req, res, next) => controller.update(req, res, next));
router.delete('/:id', authenticate, requireAdmin, (req, res, next) => controller.delete(req, res, next));

export default router;
