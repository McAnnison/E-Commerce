# Fruit & Vegetables E-Commerce Platform

A modern web application for managing a fruit and vegetable shop with online ordering capabilities.

## 🏗️ Architecture

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Backend**: Node.js with Express and TypeScript
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT-based authentication

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd E-Commerce
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   cp .env .env.local  # Update with your settings
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```

3. **Set up the Frontend**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env.local  # Update with your settings
   ```

### Development

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on http://localhost:3001

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Application will run on http://localhost:3000

## 📋 Features

### Customer Features
- Browse products by category
- Search and filter products
- Add items to shopping cart
- Place and track orders
- User account management

### Admin Features
- Product management (CRUD operations)
- Category management
- Order management and status updates
- User management
- Inventory tracking

### Shop Management
- Stock management
- Order fulfillment workflow
- Customer communication

## 🔐 Default Credentials

After running the seed script, you can use these credentials:

**Admin Account:**
- Email: admin@fruitshop.com
- Password: admin123

**Customer Account:**
- Email: customer@example.com
- Password: customer123

## 📁 Project Structure

```
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   └── index.ts        # Server entry point
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── package.json
├── frontend/               # Next.js application
│   ├── src/
│   │   ├── app/           # Next.js app router pages
│   │   ├── components/    # React components
│   │   ├── lib/           # Utilities and API client
│   │   └── types/         # TypeScript type definitions
│   └── package.json
└── README.md
```

## 🗄️ Database Schema

- **Users**: Customer and admin accounts
- **Categories**: Product categories (Fruits, Vegetables, etc.)
- **Products**: Individual products with pricing and inventory
- **Orders**: Customer orders with items and status tracking
- **OrderItems**: Individual items within orders

## 🔧 Available Scripts

### Backend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 API Documentation

The backend provides RESTful APIs for:

- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `GET /api/products` - Get products (with filtering)
- `GET /api/categories` - Get categories
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders

## 🚢 Deployment

1. **Backend Deployment**
   - Set environment variables
   - Run `npm run build`
   - Deploy to your hosting service
   - Run database migrations

2. **Frontend Deployment**
   - Update API URL in environment variables
   - Run `npm run build`
   - Deploy static files to your hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.