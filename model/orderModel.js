const db = require('../config/db');

const OrderModel = {
    getAll: (callback) => {
        const sql = `
            SELECT orders.*, foods.food_name, foods.price,
                   delivery_locations.location_name, delivery_locations.address
            FROM orders
            JOIN foods ON orders.food_id = foods.id
            JOIN delivery_locations ON orders.location_id = delivery_locations.id
            ORDER BY orders.id ASC
        `;
        db.all(sql, [], callback);
    },

    getById: (id, callback) => {
        db.get('SELECT * FROM orders WHERE id = ?', [id], callback);
    },

    // Only delivery locations that serve the given food (matches the FK relationship)
    getLocationsForFood: (foodId, callback) => {
        db.all('SELECT * FROM delivery_locations WHERE food_id = ?', [foodId], callback);
    },

    create: (order, callback) => {
        const { food_id, location_id, customer_name, quantity, status } = order;
        db.run(
            'INSERT INTO orders (food_id, location_id, customer_name, quantity, status) VALUES (?, ?, ?, ?, ?)',
            [food_id, location_id, customer_name, quantity, status || 'Pending'],
            function (err) {
                callback(err, this.lastID);
            }
        );
    },

    update: (id, order, callback) => {
        const { food_id, location_id, customer_name, quantity, status } = order;
        db.run(
            'UPDATE orders SET food_id = ?, location_id = ?, customer_name = ?, quantity = ?, status = ? WHERE id = ?',
            [food_id, location_id, customer_name, quantity, status, id],
            function (err) {
                callback(err, this.changes);
            }
        );
    },

    delete: (id, callback) => {
        db.run('DELETE FROM orders WHERE id = ?', [id], function (err) {
            callback(err, this.changes);
        });
    }
};

module.exports = OrderModel;
