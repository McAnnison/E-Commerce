"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../index");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Get all users (Admin only)
router.get('/', auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const [users, total] = await Promise.all([
            index_1.prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                    name: true,
                    phone: true,
                    address: true,
                    role: true,
                    createdAt: true,
                    _count: {
                        select: { orders: true }
                    }
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: Number(limit)
            }),
            index_1.prisma.user.count()
        ]);
        res.json({
            users,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit))
            }
        });
    }
    catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Get user by ID (Admin only)
router.get('/:id', auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await index_1.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                address: true,
                role: true,
                createdAt: true,
                orders: {
                    select: {
                        id: true,
                        orderNumber: true,
                        status: true,
                        totalAmount: true,
                        createdAt: true
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 10
                }
            }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user });
    }
    catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Update user profile
router.put('/profile', auth_1.authenticateToken, async (req, res) => {
    try {
        const { name, phone, address } = req.body;
        const user = await index_1.prisma.user.update({
            where: { id: req.user.id },
            data: {
                name,
                phone,
                address
            },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                address: true,
                role: true
            }
        });
        res.json({
            message: 'Profile updated successfully',
            user
        });
    }
    catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Update user role (Admin only)
router.patch('/:id/role', auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        if (!['ADMIN', 'CUSTOMER'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }
        const user = await index_1.prisma.user.update({
            where: { id },
            data: { role },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                address: true,
                role: true
            }
        });
        res.json({
            message: 'User role updated successfully',
            user
        });
    }
    catch (error) {
        console.error('Update user role error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map