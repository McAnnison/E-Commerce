import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@fruitshop.com' },
    update: {},
    create: {
      email: 'admin@fruitshop.com',
      name: 'Shop Administrator',
      password: adminPassword,
      role: 'ADMIN',
      phone: '+1234567890',
      address: '123 Shop Street, City'
    }
  });

  // Create test customer
  const customerPassword = await bcrypt.hash('customer123', 10);
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      name: 'John Doe',
      password: customerPassword,
      role: 'CUSTOMER',
      phone: '+0987654321',
      address: '456 Customer Ave, City'
    }
  });

  // Create categories
  const categories = [
    {
      name: 'Fruits',
      description: 'Fresh seasonal fruits',
      image: '/images/categories/fruits.jpg'
    },
    {
      name: 'Vegetables',
      description: 'Fresh organic vegetables',
      image: '/images/categories/vegetables.jpg'
    },
    {
      name: 'Herbs',
      description: 'Fresh aromatic herbs',
      image: '/images/categories/herbs.jpg'
    },
    {
      name: 'Root Vegetables',
      description: 'Root vegetables and tubers',
      image: '/images/categories/root-vegetables.jpg'
    }
  ];

  const createdCategories = [];
  for (const categoryData of categories) {
    const category = await prisma.category.upsert({
      where: { name: categoryData.name },
      update: {},
      create: categoryData
    });
    createdCategories.push(category);
  }

  // Create products
  const products = [
    // Fruits
    {
      name: 'Bananas',
      description: 'Fresh ripe bananas, perfect for snacking or smoothies',
      price: 1.99,
      unit: 'bunch',
      stock: 50,
      image: '/images/products/bananas.jpg',
      categoryName: 'Fruits'
    },
    {
      name: 'Apples',
      description: 'Crisp red apples, great for eating fresh or baking',
      price: 2.49,
      unit: 'kg',
      stock: 30,
      image: '/images/products/apples.jpg',
      categoryName: 'Fruits'
    },
    {
      name: 'Oranges',
      description: 'Juicy valencia oranges, packed with vitamin C',
      price: 3.99,
      unit: 'kg',
      stock: 25,
      image: '/images/products/oranges.jpg',
      categoryName: 'Fruits'
    },
    {
      name: 'Strawberries',
      description: 'Sweet and juicy strawberries, perfect for desserts',
      price: 4.99,
      unit: 'punnet',
      stock: 20,
      image: '/images/products/strawberries.jpg',
      categoryName: 'Fruits'
    },
    // Vegetables
    {
      name: 'Tomatoes',
      description: 'Fresh vine-ripened tomatoes',
      price: 3.49,
      unit: 'kg',
      stock: 40,
      image: '/images/products/tomatoes.jpg',
      categoryName: 'Vegetables'
    },
    {
      name: 'Cucumbers',
      description: 'Crisp fresh cucumbers',
      price: 1.99,
      unit: 'kg',
      stock: 35,
      image: '/images/products/cucumbers.jpg',
      categoryName: 'Vegetables'
    },
    {
      name: 'Bell Peppers',
      description: 'Colorful bell peppers - red, yellow, and green',
      price: 2.99,
      unit: 'kg',
      stock: 30,
      image: '/images/products/bell-peppers.jpg',
      categoryName: 'Vegetables'
    },
    {
      name: 'Lettuce',
      description: 'Fresh crispy lettuce heads',
      price: 1.49,
      unit: 'head',
      stock: 25,
      image: '/images/products/lettuce.jpg',
      categoryName: 'Vegetables'
    },
    // Herbs
    {
      name: 'Basil',
      description: 'Fresh basil leaves',
      price: 2.99,
      unit: 'bunch',
      stock: 15,
      image: '/images/products/basil.jpg',
      categoryName: 'Herbs'
    },
    {
      name: 'Parsley',
      description: 'Fresh parsley',
      price: 1.99,
      unit: 'bunch',
      stock: 20,
      image: '/images/products/parsley.jpg',
      categoryName: 'Herbs'
    },
    // Root Vegetables
    {
      name: 'Carrots',
      description: 'Fresh organic carrots',
      price: 1.99,
      unit: 'kg',
      stock: 45,
      image: '/images/products/carrots.jpg',
      categoryName: 'Root Vegetables'
    },
    {
      name: 'Potatoes',
      description: 'Versatile potatoes for cooking',
      price: 1.49,
      unit: 'kg',
      stock: 60,
      image: '/images/products/potatoes.jpg',
      categoryName: 'Root Vegetables'
    }
  ];

  for (const productData of products) {
    const category = createdCategories.find(c => c.name === productData.categoryName);
    if (category) {
      await prisma.product.upsert({
        where: { 
          name: productData.name
        },
        update: {},
        create: {
          name: productData.name,
          description: productData.description,
          price: productData.price,
          unit: productData.unit,
          stock: productData.stock,
          image: productData.image,
          categoryId: category.id
        }
      });
    }
  }

  console.log('✅ Database seeded successfully!');
  console.log('🔑 Admin credentials: admin@fruitshop.com / admin123');
  console.log('👤 Customer credentials: customer@example.com / customer123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });