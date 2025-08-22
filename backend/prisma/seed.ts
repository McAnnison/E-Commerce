import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create categories
  const fruitCategory = await prisma.category.upsert({
    where: { name: 'Fruits' },
    update: {},
    create: {
      name: 'Fruits',
      description: 'Fresh seasonal fruits',
      imageUrl: '/images/categories/fruits.jpg'
    }
  });

  const vegetableCategory = await prisma.category.upsert({
    where: { name: 'Vegetables' },
    update: {},
    create: {
      name: 'Vegetables',
      description: 'Fresh organic vegetables',
      imageUrl: '/images/categories/vegetables.jpg'
    }
  });

  const herbCategory = await prisma.category.upsert({
    where: { name: 'Herbs' },
    update: {},
    create: {
      name: 'Herbs',
      description: 'Fresh herbs and spices',
      imageUrl: '/images/categories/herbs.jpg'
    }
  });

  // Create suppliers
  const supplier1 = await prisma.supplier.create({
    data: {
      name: 'Fresh Farm Co.',
      email: 'orders@freshfarm.com',
      phone: '+233-20-123-4567',
      address: '123 Farm Road, Accra, Ghana'
    }
  });

  const supplier2 = await prisma.supplier.create({
    data: {
      name: 'Organic Valley',
      email: 'supply@organicvalley.gh',
      phone: '+233-24-987-6543',
      address: '456 Green Valley, Kumasi, Ghana'
    }
  });

  // Create products
  const products = [
    // Fruits
    {
      name: 'Fresh Bananas',
      description: 'Sweet and ripe bananas, perfect for breakfast or snacks',
      price: 8.50,
      unit: 'bunch',
      stockQuantity: 150,
      categoryId: fruitCategory.id,
      supplierId: supplier1.id,
      imageUrl: '/images/products/bananas.jpg'
    },
    {
      name: 'Red Apples',
      description: 'Crispy red apples imported from South Africa',
      price: 15.00,
      unit: 'kg',
      stockQuantity: 80,
      categoryId: fruitCategory.id,
      supplierId: supplier1.id,
      imageUrl: '/images/products/apples.jpg'
    },
    {
      name: 'Oranges',
      description: 'Juicy Valencia oranges, rich in vitamin C',
      price: 12.00,
      unit: 'kg',
      stockQuantity: 120,
      categoryId: fruitCategory.id,
      supplierId: supplier2.id,
      imageUrl: '/images/products/oranges.jpg'
    },
    {
      name: 'Pineapple',
      description: 'Sweet tropical pineapple, locally grown',
      price: 10.00,
      unit: 'piece',
      stockQuantity: 45,
      categoryId: fruitCategory.id,
      supplierId: supplier1.id,
      imageUrl: '/images/products/pineapple.jpg'
    },
    // Vegetables
    {
      name: 'Tomatoes',
      description: 'Fresh red tomatoes, perfect for cooking',
      price: 6.00,
      unit: 'kg',
      stockQuantity: 200,
      categoryId: vegetableCategory.id,
      supplierId: supplier2.id,
      imageUrl: '/images/products/tomatoes.jpg'
    },
    {
      name: 'Onions',
      description: 'Red onions from local farms',
      price: 4.50,
      unit: 'kg',
      stockQuantity: 180,
      categoryId: vegetableCategory.id,
      supplierId: supplier1.id,
      imageUrl: '/images/products/onions.jpg'
    },
    {
      name: 'Carrots',
      description: 'Fresh organic carrots, rich in beta-carotene',
      price: 7.00,
      unit: 'kg',
      stockQuantity: 90,
      categoryId: vegetableCategory.id,
      supplierId: supplier2.id,
      imageUrl: '/images/products/carrots.jpg'
    },
    {
      name: 'Bell Peppers',
      description: 'Colorful bell peppers - red, green, and yellow',
      price: 18.00,
      unit: 'kg',
      stockQuantity: 60,
      categoryId: vegetableCategory.id,
      supplierId: supplier1.id,
      imageUrl: '/images/products/bell-peppers.jpg'
    },
    // Herbs
    {
      name: 'Fresh Ginger',
      description: 'Organic ginger root for cooking and tea',
      price: 25.00,
      unit: 'kg',
      stockQuantity: 30,
      categoryId: herbCategory.id,
      supplierId: supplier2.id,
      imageUrl: '/images/products/ginger.jpg'
    },
    {
      name: 'Basil Leaves',
      description: 'Fresh basil leaves for seasoning',
      price: 20.00,
      unit: 'bunch',
      stockQuantity: 40,
      categoryId: herbCategory.id,
      supplierId: supplier1.id,
      imageUrl: '/images/products/basil.jpg'
    }
  ];

  for (const productData of products) {
    await prisma.product.create({
      data: productData
    });
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@fruitmarket.com' },
    update: {},
    create: {
      email: 'admin@fruitmarket.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      phone: '+233-20-000-0000',
      role: 'ADMIN'
    }
  });

  // Create sample customer
  const customerPassword = await bcrypt.hash('customer123', 12);
  await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      password: customerPassword,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+233-24-111-1111',
      role: 'CUSTOMER'
    }
  });

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