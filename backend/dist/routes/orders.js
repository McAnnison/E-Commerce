"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../index");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Get user's orders
router.get('/', auth_1.authenticateToken, async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const where = req.user?.role === 'ADMIN' ? {} : { userId: req.user.id };
        const [orders, total] = await Promise.all([
            index_1.prisma.order.findMany({
                where,
                include: {
                    user: {
                        select: { id: true, name: true, email: true, phone: true }
                    },
                    orderItems: {
                        include: {
                            product: {
                                select: { id: true, name: true, image: true, unit: true }
                            }
                        }
                    }
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: Number(limit)
            }),
            index_1.prisma.order.count({ where })
        ]);
        res.json({
            orders,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit))
            }
        });
    }
    catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Get order by ID
router.get('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const order = await index_1.prisma.order.findUnique({
            where: { id },
            include: {
                user: {
                    select: { id: true, name: true, email: true, phone: true }
                },
                orderItems: {
                    include: {
                        product: {
                            select: { id: true, name: true, image: true, unit: true }
                        }
                    }
                }
            }
        });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Check if user can access this order
        if (req.user?.role !== 'ADMIN' && order.userId !== req.user?.id) {
            return res.status(403).json({ message: 'Access denied' });
        }
        res.json({ order });
    }
    catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Create order
router.post('/', auth_1.authenticateToken, async (req, res) => {
    try {
        const { items, deliveryAddress, notes, deliveryDate } = req.body;
        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'Order must contain at least one item' });
        }
        // Validate products and calculate total
        let totalAmount = 0;
        const orderItems = [];
        for (const item of items) {
            const product = await index_1.prisma.product.findUnique({
                where: { id: item.productId }
            });
            if (!product) {
                return res.status(400).json({ message: `Product not found: ${item.productId}` });
            }
            if (!product.isActive) {
                return res.status(400).json({ message: `Product not available: ${product.name}` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Insufficient stock for ${product.name}. Available: ${product.stock}`
                });
            }
            const itemTotal = product.price * item.quantity;
            totalAmount += itemTotal;
            orderItems.push({
                productId: item.productId,
                quantity: item.quantity,
                price: product.price
            });
        }
        // Generate order number
        const orderCount = await index_1.prisma.order.count();
        const orderNumber = `ORD-${Date.now()}-${String(orderCount + 1).padStart(4, '0')}`;
        // Create order with order items
        const order = await index_1.prisma.order.create({
            data: {
                orderNumber,
                userId: req.user.id,
                totalAmount,
                deliveryAddress,
                notes,
                deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
                orderItems: {
                    create: orderItems
                }
            },
            include: {
                user: {
                    select: { id: true, name: true, email: true, phone: true }
                },
                orderItems: {
                    include: {
                        product: {
                            select: { id: true, name: true, image: true, unit: true }
                        }
                    }
                }
            }
        });
        // Update product stock
        for (const item of items) {
            await index_1.prisma.product.update({
                where: { id: item.productId },
                data: {
                    stock: {
                        decrement: item.quantity
                    }
                }
            });
        }
        res.status(201).json({
            message: 'Order created successfully',
            order
        });
    }
    catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Update order status (Admin only)
router.patch('/:id/status', auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const validStatuses = ['PENDING', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        const order = await index_1.prisma.order.update({
            where: { id },
            data: { status },
            include: {
                user: {
                    select: { id: true, name: true, email: true, phone: true }
                },
                orderItems: {
                    include: {
                        product: {
                            select: { id: true, name: true, image: true, unit: true }
                        }
                    }
                }
            }
        });
        res.json({
            message: 'Order status updated successfully',
            order
        });
    }
    catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Cancel order
router.patch('/:id/cancel', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const order = await index_1.prisma.order.findUnique({
            where: { id },
            include: { orderItems: true }
        });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Check if user can cancel this order
        if (req.user?.role !== 'ADMIN' && order.userId !== req.user?.id) {
            return res.status(403).json({ message: 'Access denied' });
        }
        // Check if order can be cancelled
        if (order.status === 'DELIVERED' || order.status === 'CANCELLED') {
            return res.status(400).json({ message: 'Order cannot be cancelled' });
        }
        // Update order status
        const updatedOrder = await index_1.prisma.order.update({
            where: { id },
            data: { status: 'CANCELLED' },
            include: {
                user: {
                    select: { id: true, name: true, email: true, phone: true }
                },
                orderItems: {
                    include: {
                        product: {
                            select: { id: true, name: true, image: true, unit: true }
                        }
                    }
                }
            }
        });
        // Restore product stock
        for (const item of order.orderItems) {
            await index_1.prisma.product.update({
                where: { id: item.productId },
                data: {
                    stock: {
                        increment: item.quantity
                    }
                }
            });
        }
        res.json({
            message: 'Order cancelled successfully',
            order: updatedOrder
        });
    }
    catch (error) {
        console.error('Cancel order error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=orders.js.map