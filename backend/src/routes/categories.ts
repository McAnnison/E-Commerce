import { Router } from 'express';
import { prisma } from '../index';

const router = Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: {
              where: {
                isAvailable: true
              }
            }
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single category with products
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          where: {
            isAvailable: true
          },
          include: {
            reviews: {
              select: {
                rating: true
              }
            }
          }
        }
      }
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Add average ratings to products
    const productsWithRatings = category.products.map((product: any) => ({
      ...product,
      averageRating: product.reviews.length > 0 
        ? product.reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / product.reviews.length
        : 0,
      reviews: undefined
    }));

    return res.json({
      ...category,
      products: productsWithRatings
    });
  } catch (error) {
    console.error('Get category error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;