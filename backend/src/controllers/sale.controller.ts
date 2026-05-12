import { Request, Response, NextFunction } from 'express';
import { SaleService } from '../services/sale.service.js';
import { createSaleSchema } from '../types/schemas.js';

const saleService = new SaleService();

export class SaleController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { type, status } = req.query;
      const sales = await saleService.findAll({
        type: type as 'MANUAL' | 'ONLINE' | undefined,
        status: status as string,
      });
      res.json(sales);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const sale = await saleService.findById(req.params.id);
      res.json(sale);
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
      const data = createSaleSchema.parse(req.body);
      const sale = await saleService.create(data);
      res.status(201).json(sale);
    } catch (error: any) {
      if (error.statusCode) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        next(error);
      }
    }
  }

  async dashboard(_req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await saleService.getDashboardStats();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }
}
