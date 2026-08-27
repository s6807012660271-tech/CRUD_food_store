const supabase = require('../config/db');

const LocationModel = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('delivery_locations')
            .select(`
                *,
                foods (food_name)
            `)
            .order('id', { ascending: true });
        if (error) throw error;
        return data;
    },

    getById: async (id) => {
        const { data, error } = await supabase
            .from('delivery_locations')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        return data;
    },

    create: async (location) => {
        const { food_id, location_name, address, delivery_fee } = location;
        const { data, error } = await supabase
            .from('delivery_locations')
            .insert([{ food_id, location_name, address, delivery_fee }])
            .select();
        if (error) throw error;
        return data[0];
    },

    update: async (id, location) => {
        const { food_id, location_name, address, delivery_fee } = location;
        const { data, error } = await supabase
            .from('delivery_locations')
            .update({ food_id, location_name, address, delivery_fee })
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    },

    delete: async (id) => {
        const { error } = await supabase
            .from('delivery_locations')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return true;
    }
};

module.exports = LocationModel;
