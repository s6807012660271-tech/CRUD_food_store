const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

// List all orders
router.get('/orders', orderController.index);

// Show add-order form
router.get('/orders/add', orderController.showAddForm);

// Create a new order
router.post('/orders/add', orderController.create);

// Show edit form for an order
router.get('/orders/edit/:id', orderController.showEditForm);

// Update an order
router.put('/orders/edit/:id', orderController.update);

// Delete an order
router.delete('/orders/delete/:id', orderController.delete);

module.exports = router;
