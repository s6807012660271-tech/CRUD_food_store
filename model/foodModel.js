const db = require('../config/db');

const FoodModel = {
    getAll: (callback) => {
        db.all('SELECT * FROM foods ORDER BY id ASC', [], callback);
    },

    getById: (id, callback) => {
        db.get('SELECT * FROM foods WHERE id = ?', [id], callback);
    },

    create: (food, callback) => {
        const { food_name, food_type, price } = food;
        db.run(
            'INSERT INTO foods (food_name, food_type, price) VALUES (?, ?, ?)',
            [food_name, food_type, price],
            function (err) {
                callback(err, this.lastID);
            }
        );
    },

    update: (id, food, callback) => {
        const { food_name, food_type, price } = food;
        db.run(
            'UPDATE foods SET food_name = ?, food_type = ?, price = ? WHERE id = ?',
            [food_name, food_type, price, id],
            function (err) {
                callback(err, this.changes);
            }
        );
    },

    delete: (id, callback) => {
        db.run('DELETE FROM foods WHERE id = ?', [id], function (err) {
            callback(err, this.changes);
        });
    }
};

module.exports = FoodModel;
