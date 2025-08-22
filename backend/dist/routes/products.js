"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../index");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Get all products with optional filtering
router.get('/', async (req, res) => {
    try {
        const { category, search, page = 1, limit = 20 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const where = {
            isActive: true
        };
        if (category) {
            where.categoryId = category;
        }
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ];
        }
        const [products, total] = await Promise.all([
            index_1.prisma.product.findMany({
                where,
                include: {
                    category: true
                },
                orderBy: { name: 'asc' },
                skip,
                take: Number(limit)
            }),
            index_1.prisma.product.count({ where })
        ]);
        res.json({
            products,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit))
            }
        });
    }
    catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await index_1.prisma.product.findUnique({
            where: { id },
            include: {
                category: true
            }
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ product });
    }
    catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Create product (Admin only)
router.post('/', auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        const { name, description, price, unit, image, stock, categoryId } = req.body;
        const product = await index_1.prisma.product.create({
            data: {
                name,
                description,
                price: Number(price),
                unit,
                image,
                stock: Number(stock),
                categoryId
            },
            include: {
                category: true
            }
        });
        res.status(201).json({
            message: 'Product created successfully',
            product
        });
    }
    catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Update product (Admin only)
router.put('/:id', auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, unit, image, stock, categoryId, isActive } = req.body;
        const product = await index_1.prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                price: price ? Number(price) : undefined,
                unit,
                image,
                stock: stock !== undefined ? Number(stock) : undefined,
                categoryId,
                isActive
            },
            include: {
                category: true
            }
        });
        res.json({
            message: 'Product updated successfully',
            product
        });
    }
    catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Delete product (Admin only)
router.delete('/:id', auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await index_1.prisma.product.delete({
            where: { id }
        });
        res.json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Update product stock (Admin only)
router.patch('/:id/stock', auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;
        const product = await index_1.prisma.product.update({
            where: { id },
            data: { stock: Number(stock) },
            include: { category: true }
        });
        res.json({
            message: 'Product stock updated successfully',
            product
        });
    }
    catch (error) {
        console.error('Update stock error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=products.js.map