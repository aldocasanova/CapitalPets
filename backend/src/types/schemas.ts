import { z } from 'zod';

// ── Auth Schemas ──
export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

// ── Product Schemas ──
export const createProductSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  price: z.number().positive('El precio debe ser positivo'),
  stock: z.number().int().min(0, 'El stock no puede ser negativo'),
  categoryId: z.number().int().positive('La categoría es requerida'),
  imageUrl: z.string().url().optional(),
});

export const updateProductSchema = createProductSchema.partial();

// ── Category Schemas ──
export const createCategorySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  slug: z.string().min(1, 'El slug es requerido'),
  imageUrl: z.string().url().optional(),
});

// ── Sale Schemas ──
export const createSaleSchema = z.object({
  type: z.enum(['MANUAL', 'ONLINE']),
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().int().positive(),
    })
  ).min(1, 'Debe incluir al menos un producto'),
});

// ── Types ──
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type CreateSaleInput = z.infer<typeof createSaleSchema>;
