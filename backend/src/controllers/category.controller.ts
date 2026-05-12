import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../services/category.service.js';
import { createCategorySchema } from '../types/schemas.js';

const categoryService = new CategoryService();

export class CategoryController {
  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categoryService.findAll();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categoryService.findById(parseInt(req.params.id));
      res.json(category);
    } catch (error: any) {
      if (error.statusCode) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        next(error);
      }
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createCategorySchema.parse(req.body);
      const category = await categoryService.create(data);
      res.status(201).json(category);
    } catch (error: any) {
      if (error.statusCode) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        next(error);
      }
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createCategorySchema.partial().parse(req.body);
      const category = await categoryService.update(parseInt(req.params.id), data);
      res.json(category);
    } catch (error: any) {
      if (error.statusCode) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        next(error);
      }
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await categoryService.delete(parseInt(req.params.id));
      res.json({ message: 'Categoría eliminada correctamente' });
    } catch (error: any) {
      if (error.statusCode) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        next(error);
      }
    }
  }
}
