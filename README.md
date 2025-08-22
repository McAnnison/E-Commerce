# E-Commerce Web Application

A comprehensive web application designed for Fruit Market to streamline company operations, manage inventory, process orders, and coordinate delivery services.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Testing](#testing)
- [Deployment](#deployment)
- [License](#license)
- [Contact](#contact)

## 🎯 Overview

This E-Commerce platform is specifically tailored for fruit market operations, providing a complete solution for:

- **Inventory Management**: Track fruit stock, expiration dates, and supplier information
- **Order Processing**: Handle customer orders from placement to fulfillment
- **Delivery Coordination**: Manage delivery routes, schedules, and tracking
- **Customer Management**: Maintain customer profiles and order history
- **Financial Tracking**: Monitor sales, expenses, and profitability

## ✨ Features

### Current Features
> **Note**: This project is in early development. Features listed below are planned for implementation.

### Planned Features

#### 🛒 Customer Features
- [ ] User registration and authentication
- [ ] Browse fruit catalog with detailed information
- [ ] Shopping cart functionality
- [ ] Order placement and tracking
- [ ] Delivery scheduling
- [ ] Order history and reordering
- [ ] Customer reviews and ratings

#### 🏪 Admin Features
- [ ] Inventory management dashboard
- [ ] Order management system
- [ ] Delivery route optimization
- [ ] Sales analytics and reporting
- [ ] Customer relationship management
- [ ] Supplier management
- [ ] Financial reporting

#### 🚚 Delivery Features
- [ ] Real-time delivery tracking
- [ ] Route optimization
- [ ] Delivery status updates
- [ ] Driver mobile interface
- [ ] Delivery confirmation system

## 🛠 Technology Stack

**Frontend:**
- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Turbopack (Next.js built-in)
- **UI Components**: Custom components with responsive design

**Backend:**
- **Runtime**: Node.js
- **Framework**: Express.js with TypeScript
- **Database**: SQLite (development) / PostgreSQL (production)
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, bcryptjs for password hashing

**Development Tools:**
- **Language**: TypeScript for both frontend and backend
- **Package Manager**: npm with workspaces
- **Database Management**: Prisma Studio
- **Development Server**: Nodemon for backend hot reload

**Planned Integrations:**
- **Payment Processing**: Stripe integration (planned)
- **Image Storage**: Cloudinary or AWS S3 (planned)
- **Email Service**: SendGrid or Nodemailer (planned)
- **SMS Notifications**: Twilio (planned)

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Git**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/McAnnison/E-Commerce.git
cd E-Commerce
```

2. **Install dependencies**
```bash
# Install all dependencies (root, frontend, and backend)
npm run install:all
```

3. **Set up environment variables**
```bash
# Backend environment variables
cd backend
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
```

4. **Set up the database**
```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed the database with sample data
npm run db:seed
```

### Development

1. **Start the development servers**
```bash
# Start both frontend and backend in development mode
npm run dev
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

2. **Alternative: Start servers individually**
```bash
# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend
```

3. **Database management**
```bash
# Open Prisma Studio (database GUI)
npm run db:studio
```

### Configuration

The application is configured with workspaces for easy development:

- **Root**: Main package.json with workspace configuration
- **Frontend**: Next.js application in `/frontend`
- **Backend**: Express.js API in `/backend`

## 📖 Usage

### Customer Interface

**Homepage** (`http://localhost:3000`)
- Modern, responsive design showcasing fresh produce
- Easy navigation to products and categories
- Featured categories with visual appeal

**Product Catalog** (`http://localhost:3000/products`)
- Browse all available fruits and vegetables
- Filter by category (Fruits, Vegetables, Herbs)
- Product cards with images, prices, and ratings
- Shopping cart functionality (coming soon)

### API Endpoints

**Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

**Products**
- `GET /api/products` - Get all products with filtering
- `GET /api/products/:id` - Get single product details

**Categories**
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category with products

**Health Check**
- `GET /health` - API health status

### Sample Data

The application comes with pre-seeded data including:

**Categories:**
- Fruits (apples, bananas, oranges, pineapple)
- Vegetables (tomatoes, onions, carrots, bell peppers)
- Herbs (ginger, basil)

**Users:**
- Admin: `admin@fruitmarket.com` / `admin123`
- Customer: `customer@example.com` / `customer123`

**Suppliers:**
- Fresh Farm Co.
- Organic Valley

## 📚 API Documentation

API documentation will be provided once the backend services are developed.

## 🤝 Contributing

We welcome contributions to this project! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Write clear, concise commit messages
- Follow coding standards (to be established)
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 🧪 Testing

Testing framework and instructions will be added once the codebase is established.

## 🚀 Deployment

Deployment instructions will be provided once the application is ready for production.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Project Maintainer**: Mensah Kwame Anni

- **GitHub**: [@McAnnison](https://github.com/McAnnison)
- **Project Repository**: [E-Commerce](https://github.com/McAnnison/E-Commerce)

---

## 🏗 Project Status

**Current Status**: ✅ **Core Structure Implemented** ✅

This project has been successfully set up with a complete full-stack architecture:

### ✅ Completed Features:
- ✅ **Project Structure**: Monorepo with frontend and backend workspaces
- ✅ **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- ✅ **Backend**: Express.js API with TypeScript
- ✅ **Database**: Prisma ORM with SQLite (development ready)
- ✅ **Authentication**: JWT-based auth system with bcrypt
- ✅ **API Endpoints**: Products, categories, and auth routes
- ✅ **UI Components**: Responsive homepage and product catalog
- ✅ **Database Schema**: Complete e-commerce data model
- ✅ **Seed Data**: Sample products, categories, and users
- ✅ **Development Setup**: Hot reload for both frontend and backend
- ✅ **Build System**: Production-ready builds for both apps

### 🚧 Next Steps (Planned):
- [ ] **Shopping Cart**: Add to cart functionality
- [ ] **User Authentication**: Login/register forms and protected routes
- [ ] **Order Management**: Place orders and order history
- [ ] **Admin Dashboard**: Inventory and order management interface
- [ ] **Payment Integration**: Stripe or PayPal integration
- [ ] **Delivery Tracking**: Real-time order tracking system
- [ ] **Image Upload**: Product image management
- [ ] **Email Notifications**: Order confirmations and updates

### 🎯 Ready for Development:
The application is now ready for feature development. The core infrastructure is in place with:
- Modern tech stack (Next.js + Express + Prisma)
- Type-safe development experience
- Responsive UI design
- RESTful API architecture
- Scalable database schema

---

*This README will be updated as the project evolves and new features are implemented.*