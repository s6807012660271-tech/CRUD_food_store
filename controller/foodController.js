const foodModel = require('../model/foodModel');

const foodController = {
    index: (req, res) => {
        foodModel.getAll((err, foods) => {
            if (err) return res.status(500).json({ error: err.message });
            res.render('index', { foods, title: 'Online Food Store' });
        });
    },

    showAddForm: (req, res) => {
        res.render('add', { title: 'Add New Food' });
    },

    create: (req, res) => {
        const { food_name, food_type, price } = req.body;
        const newFood = { food_name, food_type, price };
        foodModel.create(newFood, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.redirect('/');
        });
    },

    showEditForm: (req, res) => {
        const foodId = req.params.id;
        foodModel.getById(foodId, (err, food) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!food) return res.status(404).json({ error: 'Food not found' });
            res.render('edit', { food, title: 'Edit Food' });
        });
    },

    update: (req, res) => {
        const foodId = req.params.id;
        const { food_name, food_type, price } = req.body;
        const updatedFood = { food_name, food_type, price };

        foodModel.update(foodId, updatedFood, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.redirect('/');
        });
    },

    delete: (req, res) => {
        const foodId = req.params.id;
        foodModel.delete(foodId, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.redirect('/');
        });
    }
};

module.exports = foodController;
