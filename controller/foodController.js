const foodModel = require('../model/foodModel');

const foodController = {
    index: async (req, res) => {
        try {
            const foods = await foodModel.getAll();
            res.render('index', { foods, title: 'Online Food Store' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    showAddForm: (req, res) => {
        res.render('add', { title: 'Add New Food' });
    },

    create: async (req, res) => {
        try {
            const { food_name, food_type, price } = req.body;
            const newFood = { food_name, food_type, price };
            await foodModel.create(newFood);
            res.redirect('/');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    showEditForm: async (req, res) => {
        try {
            const foodId = req.params.id;
            const food = await foodModel.getById(foodId);
            if (!food) return res.status(404).json({ error: 'Food not found' });
            res.render('edit', { food, title: 'Edit Food' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const foodId = req.params.id;
            const { food_name, food_type, price } = req.body;
            const updatedFood = { food_name, food_type, price };
            await foodModel.update(foodId, updatedFood);
            res.redirect('/');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const foodId = req.params.id;
            await foodModel.delete(foodId);
            res.redirect('/');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = foodController;
