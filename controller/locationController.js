const locationModel = require('../model/locationModel');
const foodModel = require('../model/foodModel');

const locationController = {
    index: (req, res) => {
        locationModel.getAll((err, locations) => {
            if (err) return res.status(500).json({ error: err.message });
            res.render('locations/index', { locations, title: 'Delivery Locations' });
        });
    },

    showAddForm: (req, res) => {
        foodModel.getAll((err, foods) => {
            if (err) return res.status(500).json({ error: err.message });
            res.render('locations/add', { foods, title: 'Add Delivery Location' });
        });
    },

    create: (req, res) => {
        const { food_id, location_name, address, delivery_fee } = req.body;
        const newLocation = { food_id, location_name, address, delivery_fee };
        locationModel.create(newLocation, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.redirect('/locations');
        });
    },

    showEditForm: (req, res) => {
        const locationId = req.params.id;
        locationModel.getById(locationId, (err, location) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!location) return res.status(404).json({ error: 'Delivery location not found' });
            foodModel.getAll((err2, foods) => {
                if (err2) return res.status(500).json({ error: err2.message });
                res.render('locations/edit', { location, foods, title: 'Edit Delivery Location' });
            });
        });
    },

    update: (req, res) => {
        const locationId = req.params.id;
        const { food_id, location_name, address, delivery_fee } = req.body;
        const updatedLocation = { food_id, location_name, address, delivery_fee };

        locationModel.update(locationId, updatedLocation, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.redirect('/locations');
        });
    },

    delete: (req, res) => {
        const locationId = req.params.id;
        locationModel.delete(locationId, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.redirect('/locations');
        });
    }
};

module.exports = locationController;
