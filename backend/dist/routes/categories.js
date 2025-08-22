"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../index");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await index_1.prisma.category.findMany({
            include: {
                products: {
                    where: { isActive: true },
                    select: { id: true, name: true, price: true, image: true }
                }
            },
            orderBy: { name: 'asc' }
        });
        res.json({ categories });
    }
    catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Get category by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const category = await index_1.prisma.category.findUnique({
            where: { id },
            include: {
                products: {
                    where: { isActive: true },
                    orderBy: { name: 'asc' }
                }
            }
        });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ category });
    }
    catch (error) {
        console.error('Get category error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Create category (Admin only)
router.post('/', auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        const { name, description, image } = req.body;
        const category = await index_1.prisma.category.create({
            data: {
                name,
                description,
                image
            }
        });
        res.status(201).json({
            message: 'Category created successfully',
            category
        });
    }
    catch (error) {
        console.error('Create category error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Update category (Admin only)
router.put('/:id', auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image } = req.body;
        const category = await index_1.prisma.category.update({
            where: { id },
            data: {
                name,
                description,
                image
            }
        });
        res.json({
            message: 'Category updated successfully',
            category
        });
    }
    catch (error) {
        console.error('Update category error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Delete category (Admin only)
router.delete('/:id', auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        // Check if category has products
        const productsCount = await index_1.prisma.product.count({
            where: { categoryId: id }
        });
        if (productsCount > 0) {
            return res.status(400).json({
                message: 'Cannot delete category with products. Please move or delete products first.'
            });
        }
        await index_1.prisma.category.delete({
            where: { id }
        });
        res.json({ message: 'Category deleted successfully' });
    }
    catch (error) {
        console.error('Delete category error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=categories.js.map