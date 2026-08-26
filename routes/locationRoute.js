const express = require('express');
const router = express.Router();
const locationController = require('../controller/locationController');

// List all delivery locations
router.get('/locations', locationController.index);

// Show add-location form
router.get('/locations/add', locationController.showAddForm);

// Create a new delivery location
router.post('/locations/add', locationController.create);

// Show edit form for a delivery location
router.get('/locations/edit/:id', locationController.showEditForm);

// Update a delivery location
router.put('/locations/edit/:id', locationController.update);

// Delete a delivery location
router.delete('/locations/delete/:id', locationController.delete);

module.exports = router;
