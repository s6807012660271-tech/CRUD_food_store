const supabase = require('../config/db');

const OrderModel = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                foods (food_name, price),
                delivery_locations (location_name, address)
            `)
            .order('id', { ascending: true });
        if (error) throw error;
        return data;
    },

    getById: async (id) => {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        return data;
    },

    // Only delivery locations that serve the given food (matches the FK relationship)
    getLocationsForFood: async (foodId) => {
        const { data, error } = await supabase
            .from('delivery_locations')
            .select('*')
            .eq('food_id', foodId);
        if (error) throw error;
        return data;
    },

    create: async (order) => {
        const { food_id, location_id, customer_name, quantity, status } = order;
        const { data, error } = await supabase
            .from('orders')
            .insert([{ food_id, location_id, customer_name, quantity, status: status || 'Pending' }])
            .select();
        if (error) throw error;
        return data[0];
    },

    update: async (id, order) => {
        const { food_id, location_id, customer_name, quantity, status } = order;
        const { data, error } = await supabase
            .from('orders')
            .update({ food_id, location_id, customer_name, quantity, status })
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    },

    delete: async (id) => {
        const { error } = await supabase
            .from('orders')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return true;
    }
};

module.exports = OrderModel;
