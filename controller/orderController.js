const orderModel = require('../model/orderModel');
const foodModel = require('../model/foodModel');
const locationModel = require('../model/locationModel');

const orderController = {
    index: async (req, res) => {
        try {
            const orders = await orderModel.getAll();
            res.render('orders/index', { orders, title: 'Orders' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    showAddForm: async (req, res) => {
        try {
            const foods = await foodModel.getAll();
            const locations = await locationModel.getAll();
            res.render('orders/add', { foods, locations, title: 'Add Order' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const { food_id, location_id, customer_name, quantity, status } = req.body;
            const newOrder = { food_id, location_id, customer_name, quantity, status };
            await orderModel.create(newOrder);
            res.redirect('/orders');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    showEditForm: async (req, res) => {
        try {
            const orderId = req.params.id;
            const order = await orderModel.getById(orderId);
            if (!order) return res.status(404).json({ error: 'Order not found' });
            const foods = await foodModel.getAll();
            const locations = await locationModel.getAll();
            res.render('orders/edit', { order, foods, locations, title: 'Edit Order' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const orderId = req.params.id;
            const { food_id, location_id, customer_name, quantity, status } = req.body;
            const updatedOrder = { food_id, location_id, customer_name, quantity, status };
            await orderModel.update(orderId, updatedOrder);
            res.redirect('/orders');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const orderId = req.params.id;
            await orderModel.delete(orderId);
            res.redirect('/orders');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = orderController;
