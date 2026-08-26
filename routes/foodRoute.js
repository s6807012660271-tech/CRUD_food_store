const express = require('express');
const router = express.Router();
const foodController = require('../controller/foodController');

// List all foods
router.get('/', foodController.index);

// Show add-food form
router.get('/add', foodController.showAddForm);

// Create a new food item
router.post('/add', foodController.create);

// Show edit form for a food item
router.get('/edit/:id', foodController.showEditForm);

// Update a food item
router.put('/edit/:id', foodController.update);

// Delete a food item
router.delete('/delete/:id', foodController.delete);

module.exports = router;
