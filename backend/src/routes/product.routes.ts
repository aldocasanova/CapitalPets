import { Router } from 'express';
import multer from 'multer';
import { ProductController } from '../controllers/product.controller.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();
const controller = new ProductController();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

// Public routes
router.get('/', (req, res, next) => controller.findAll(req, res, next));
router.get('/:id', (req, res, next) => controller.findById(req, res, next));

// Admin routes
router.post('/', authenticate, requireAdmin, upload.single('image'), (req, res, next) => controller.create(req, res, next));
router.put('/:id', authenticate, requireAdmin, upload.single('image'), (req, res, next) => controller.update(req, res, next));
router.delete('/:id', authenticate, requireAdmin, (req, res, next) => controller.delete(req, res, next));

export default router;
