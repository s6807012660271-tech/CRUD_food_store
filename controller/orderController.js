const orderModel = require('../model/orderModel');
const foodModel = require('../model/foodModel');
const locationModel = require('../model/locationModel');

const orderController = {
    index: (req, res) => {
        orderModel.getAll((err, orders) => {
            if (err) return res.status(500).json({ error: err.message });
            res.render('orders/index', { orders, title: 'Orders' });
        });
    },

    showAddForm: (req, res) => {
        foodModel.getAll((err, foods) => {
            if (err) return res.status(500).json({ error: err.message });
            locationModel.getAll((err2, locations) => {
                if (err2) return res.status(500).json({ error: err2.message });
                res.render('orders/add', { foods, locations, title: 'Add Order' });
            });
        });
    },

    create: (req, res) => {
        const { food_id, location_id, customer_name, quantity, status } = req.body;
        const newOrder = { food_id, location_id, customer_name, quantity, status };
        orderModel.create(newOrder, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.redirect('/orders');
        });
    },

    showEditForm: (req, res) => {
        const orderId = req.params.id;
        orderModel.getById(orderId, (err, order) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!order) return res.status(404).json({ error: 'Order not found' });
            foodModel.getAll((err2, foods) => {
                if (err2) return res.status(500).json({ error: err2.message });
                locationModel.getAll((err3, locations) => {
                    if (err3) return res.status(500).json({ error: err3.message });
                    res.render('orders/edit', { order, foods, locations, title: 'Edit Order' });
                });
            });
        });
    },

    update: (req, res) => {
        const orderId = req.params.id;
        const { food_id, location_id, customer_name, quantity, status } = req.body;
        const updatedOrder = { food_id, location_id, customer_name, quantity, status };

        orderModel.update(orderId, updatedOrder, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.redirect('/orders');
        });
    },

    delete: (req, res) => {
        const orderId = req.params.id;
        orderModel.delete(orderId, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.redirect('/orders');
        });
    }
};

module.exports = orderController;
