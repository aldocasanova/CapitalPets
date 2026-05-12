import prisma from '../config/database.js';
import { CreateProductInput, UpdateProductInput } from '../types/schemas.js';

export class ProductService {
  async findAll(filters?: { categoryId?: number; search?: string; isActive?: boolean }) {
    const where: any = {};

    if (filters?.categoryId) where.categoryId = filters.categoryId;
    if (filters?.isActive !== undefined) where.isActive = filters.isActive;
    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      throw Object.assign(new Error('Producto no encontrado'), { statusCode: 404 });
    }

    return product;
  }

  async create(data: CreateProductInput) {
    return prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        imageUrl: data.imageUrl,
        categoryId: data.categoryId,
      },
      include: { category: true },
    });
  }

  async update(id: string, data: UpdateProductInput) {
    await this.findById(id); // Verify exists
    return prisma.product.update({
      where: { id },
      data,
      include: { category: true },
    });
  }

  async delete(id: string) {
    await this.findById(id); // Verify exists
    return prisma.product.delete({ where: { id } });
  }

  async updateStock(id: string, quantity: number) {
    const product = await this.findById(id);
    const newStock = product.stock + quantity;

    if (newStock < 0) {
      throw Object.assign(new Error('Stock insuficiente'), { statusCode: 400 });
    }

    return prisma.product.update({
      where: { id },
      data: { stock: newStock },
    });
  }
}
