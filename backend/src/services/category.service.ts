import prisma from '../config/database.js';
import { CreateCategoryInput } from '../types/schemas.js';

export class CategoryService {
  async findAll() {
    return prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: number) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!category) {
      throw Object.assign(new Error('Categoría no encontrada'), { statusCode: 404 });
    }

    return category;
  }

  async create(data: CreateCategoryInput) {
    return prisma.category.create({ data });
  }

  async update(id: number, data: Partial<CreateCategoryInput>) {
    await this.findById(id);
    return prisma.category.update({ where: { id }, data });
  }

  async delete(id: number) {
    await this.findById(id);
    return prisma.category.delete({ where: { id } });
  }
}
