import prisma from '../config/database.js';
import { CreateSaleInput } from '../types/schemas.js';
import { ProductService } from './product.service.js';

const productService = new ProductService();

export class SaleService {
  async findAll(filters?: { type?: 'MANUAL' | 'ONLINE'; status?: string }) {
    const where: any = {};
    if (filters?.type) where.type = filters.type;
    if (filters?.status) where.status = filters.status;

    return prisma.sale.findMany({
      where,
      include: {
        items: {
          include: { product: { select: { name: true, imageUrl: true } } },
        },
      },
      orderBy: { date: 'desc' },
    });
  }

  async findById(id: string) {
    const sale = await prisma.sale.findUnique({
      where: { id },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!sale) {
      throw Object.assign(new Error('Venta no encontrada'), { statusCode: 404 });
    }

    return sale;
  }

  async create(data: CreateSaleInput) {
    // Calculate totals and validate stock
    let total = 0;
    const itemsData = [];

    for (const item of data.items) {
      const product = await productService.findById(item.productId);
      if (product.stock < item.quantity) {
        throw Object.assign(
          new Error(`Stock insuficiente para "${product.name}". Disponible: ${product.stock}`),
          { statusCode: 400 }
        );
      }

      const unitPrice = Number(product.price);
      const subtotal = unitPrice * item.quantity;
      total += subtotal;

      itemsData.push({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice,
        subtotal,
      });
    }

    // Create sale and update stock in a transaction
    return prisma.$transaction(async (tx) => {
      const sale = await tx.sale.create({
        data: {
          total,
          type: data.type,
          status: 'Completado',
          items: {
            create: itemsData,
          },
        },
        include: {
          items: { include: { product: true } },
        },
      });

      // Decrease stock for each item
      for (const item of data.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return sale;
    });
  }

  async getDashboardStats() {
    const [totalSales, salesByType, recentSales, totalRevenue] = await Promise.all([
      prisma.sale.count(),
      prisma.sale.groupBy({
        by: ['type'],
        _count: true,
        _sum: { total: true },
      }),
      prisma.sale.findMany({
        take: 10,
        orderBy: { date: 'desc' },
        include: { items: { include: { product: { select: { name: true } } } } },
      }),
      prisma.sale.aggregate({ _sum: { total: true } }),
    ]);

    const lowStockProducts = await prisma.product.findMany({
      where: { stock: { lte: 5 }, isActive: true },
      select: { id: true, name: true, stock: true, imageUrl: true },
      orderBy: { stock: 'asc' },
    });

    return {
      totalSales,
      totalRevenue: totalRevenue._sum.total || 0,
      salesByType,
      recentSales,
      lowStockProducts,
    };
  }
}
