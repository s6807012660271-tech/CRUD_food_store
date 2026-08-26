const db = require('../config/db');

const LocationModel = {
    getAll: (callback) => {
        const sql = `
            SELECT delivery_locations.*, foods.food_name
            FROM delivery_locations
            JOIN foods ON delivery_locations.food_id = foods.id
            ORDER BY delivery_locations.id ASC
        `;
        db.all(sql, [], callback);
    },

    getById: (id, callback) => {
        db.get('SELECT * FROM delivery_locations WHERE id = ?', [id], callback);
    },

    create: (location, callback) => {
        const { food_id, location_name, address, delivery_fee } = location;
        db.run(
            'INSERT INTO delivery_locations (food_id, location_name, address, delivery_fee) VALUES (?, ?, ?, ?)',
            [food_id, location_name, address, delivery_fee],
            function (err) {
                callback(err, this.lastID);
            }
        );
    },

    update: (id, location, callback) => {
        const { food_id, location_name, address, delivery_fee } = location;
        db.run(
            'UPDATE delivery_locations SET food_id = ?, location_name = ?, address = ?, delivery_fee = ? WHERE id = ?',
            [food_id, location_name, address, delivery_fee, id],
            function (err) {
                callback(err, this.changes);
            }
        );
    },

    delete: (id, callback) => {
        db.run('DELETE FROM delivery_locations WHERE id = ?', [id], function (err) {
            callback(err, this.changes);
        });
    }
};

module.exports = LocationModel;
