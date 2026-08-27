const supabase = require('../config/db');

const FoodModel = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('foods')
            .select('*')
            .order('id', { ascending: true });
        if (error) throw error;
        return data;
    },

    getById: async (id) => {
        const { data, error } = await supabase
            .from('foods')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        return data;
    },

    create: async (food) => {
        const { food_name, food_type, price } = food;
        const { data, error } = await supabase
            .from('foods')
            .insert([{ food_name, food_type, price }])
            .select();
        if (error) throw error;
        return data[0];
    },

    update: async (id, food) => {
        const { food_name, food_type, price } = food;
        const { data, error } = await supabase
            .from('foods')
            .update({ food_name, food_type, price })
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    },

    delete: async (id) => {
        const { error } = await supabase
            .from('foods')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return true;
    }
};

module.exports = FoodModel;
