import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service.js';
import { UploadService } from '../services/upload.service.js';
import { createProductSchema, updateProductSchema } from '../types/schemas.js';

const productService = new ProductService();
const uploadService = new UploadService();

export class ProductController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId, search, isActive } = req.query;
      const products = await productService.findAll({
        categoryId: categoryId ? parseInt(categoryId as string) : undefined,
        search: search as string,
        isActive: isActive !== undefined ? isActive === 'true' : true,
      });
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.findById(req.params.id);
      res.json(product);
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
      let imageUrl: string | undefined;

      if (req.file) {
        imageUrl = await uploadService.uploadImage(req.file.buffer, 'capital-pets/products');
      }

      const data = createProductSchema.parse({
        ...req.body,
        price: parseFloat(req.body.price),
        stock: parseInt(req.body.stock),
        categoryId: parseInt(req.body.categoryId),
        imageUrl,
      });

      const product = await productService.create(data);
      res.status(201).json(product);
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
      let imageUrl: string | undefined;

      if (req.file) {
        imageUrl = await uploadService.uploadImage(req.file.buffer, 'capital-pets/products');
      }

      const body: any = { ...req.body };
      if (body.price) body.price = parseFloat(body.price);
      if (body.stock) body.stock = parseInt(body.stock);
      if (body.categoryId) body.categoryId = parseInt(body.categoryId);
      if (imageUrl) body.imageUrl = imageUrl;

      const data = updateProductSchema.parse(body);
      const product = await productService.update(req.params.id, data);
      res.json(product);
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
      await productService.delete(req.params.id);
      res.json({ message: 'Producto eliminado correctamente' });
    } catch (error: any) {
      if (error.statusCode) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        next(error);
      }
    }
  }
}
