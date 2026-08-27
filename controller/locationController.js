const locationModel = require('../model/locationModel');
const foodModel = require('../model/foodModel');

const locationController = {
    index: async (req, res) => {
        try {
            const locations = await locationModel.getAll();
            res.render('locations/index', { locations, title: 'Delivery Locations' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    showAddForm: async (req, res) => {
        try {
            const foods = await foodModel.getAll();
            res.render('locations/add', { foods, title: 'Add Delivery Location' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const { food_id, location_name, address, delivery_fee } = req.body;
            const newLocation = { food_id, location_name, address, delivery_fee };
            await locationModel.create(newLocation);
            res.redirect('/locations');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    showEditForm: async (req, res) => {
        try {
            const locationId = req.params.id;
            const location = await locationModel.getById(locationId);
            if (!location) return res.status(404).json({ error: 'Delivery location not found' });
            const foods = await foodModel.getAll();
            res.render('locations/edit', { location, foods, title: 'Edit Delivery Location' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const locationId = req.params.id;
            const { food_id, location_name, address, delivery_fee } = req.body;
            const updatedLocation = { food_id, location_name, address, delivery_fee };
            await locationModel.update(locationId, updatedLocation);
            res.redirect('/locations');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const locationId = req.params.id;
            await locationModel.delete(locationId);
            res.redirect('/locations');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = locationController;
