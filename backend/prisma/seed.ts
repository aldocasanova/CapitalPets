import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@capitalpets.com' },
    update: {},
    create: {
      email: 'admin@capitalpets.com',
      password: hashedPassword,
      name: 'Administrador',
      role: 'ADMIN',
    },
  });
  console.log('👤 Admin user created:', admin.email);

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'comida' },
      update: {},
      create: { name: 'Comida', slug: 'comida' },
    }),
    prisma.category.upsert({
      where: { slug: 'accesorios' },
      update: {},
      create: { name: 'Accesorios', slug: 'accesorios' },
    }),
    prisma.category.upsert({
      where: { slug: 'postres' },
      update: {},
      create: { name: 'Postres', slug: 'postres' },
    }),
    prisma.category.upsert({
      where: { slug: 'ropa' },
      update: {},
      create: { name: 'Ropa', slug: 'ropa' },
    }),
    prisma.category.upsert({
      where: { slug: 'higiene' },
      update: {},
      create: { name: 'Higiene', slug: 'higiene' },
    }),
    prisma.category.upsert({
      where: { slug: 'juguetes' },
      update: {},
      create: { name: 'Juguetes', slug: 'juguetes' },
    }),
  ]);
  console.log(`📂 ${categories.length} categories created`);

  // Create sample products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Royal Canin Adult 15kg',
        description: 'Alimento premium para perros adultos. Nutrición completa y balanceada.',
        price: 45.99,
        stock: 25,
        categoryId: categories[0].id,
        imageUrl: 'https://placehold.co/400x400/3D5192/white?text=Royal+Canin',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Whiskas Gatitos 3kg',
        description: 'Alimento especial para gatitos en crecimiento con sabor a pollo.',
        price: 12.50,
        stock: 40,
        categoryId: categories[0].id,
        imageUrl: 'https://placehold.co/400x400/5EB348/white?text=Whiskas',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Collar LED Nocturno',
        description: 'Collar con luz LED recargable. Ideal para paseos nocturnos.',
        price: 8.99,
        stock: 50,
        categoryId: categories[1].id,
        imageUrl: 'https://placehold.co/400x400/E52528/white?text=Collar+LED',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Gelatina de Pollo para Perros',
        description: 'Deliciosa gelatina artesanal de pollo. Sin conservantes.',
        price: 5.00,
        stock: 15,
        categoryId: categories[2].id,
        imageUrl: 'https://placehold.co/400x400/3D5192/white?text=Gelatina',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Queque de Cumpleaños Canino',
        description: 'Queque especial para celebrar el cumpleaños de tu mascota.',
        price: 15.00,
        stock: 8,
        categoryId: categories[2].id,
        imageUrl: 'https://placehold.co/400x400/5EB348/white?text=Queque',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Suéter Navideño Talla M',
        description: 'Suéter tejido para perros medianos. Diseño navideño.',
        price: 18.50,
        stock: 20,
        categoryId: categories[3].id,
        imageUrl: 'https://placehold.co/400x400/E52528/white?text=Suéter',
      },
    }),
  ]);
  console.log(`🛍️ ${products.length} products created`);

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
