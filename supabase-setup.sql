-- Run this SQL in your Supabase SQL Editor to create the required tables
-- Navigate to https://app.supabase.com/project/YOUR_PROJECT_ID/sql/new

-- Create foods table
CREATE TABLE IF NOT EXISTS foods (
    id SERIAL PRIMARY KEY,
    food_name TEXT NOT NULL,
    food_type TEXT NOT NULL,
    price REAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create delivery_locations table
CREATE TABLE IF NOT EXISTS delivery_locations (
    id SERIAL PRIMARY KEY,
    food_id INTEGER NOT NULL,
    location_name TEXT NOT NULL,
    address TEXT NOT NULL,
    delivery_fee REAL NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    food_id INTEGER NOT NULL,
    location_id INTEGER NOT NULL,
    customer_name TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES delivery_locations(id) ON DELETE CASCADE
);

-- Enable Row Level Security (optional, for production use)
-- ALTER TABLE foods ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE delivery_locations ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies (optional, for production use)
-- These policies allow public access - adjust according to your security needs
-- CREATE POLICY "Enable read access for all users" ON foods FOR SELECT USING (true);
-- CREATE POLICY "Enable insert access for all users" ON foods FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Enable update access for all users" ON foods FOR UPDATE USING (true);
-- CREATE POLICY "Enable delete access for all users" ON foods FOR DELETE USING (true);
-- 
-- CREATE POLICY "Enable read access for all users" ON delivery_locations FOR SELECT USING (true);
-- CREATE POLICY "Enable insert access for all users" ON delivery_locations FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Enable update access for all users" ON delivery_locations FOR UPDATE USING (true);
-- CREATE POLICY "Enable delete access for all users" ON delivery_locations FOR DELETE USING (true);
-- 
-- CREATE POLICY "Enable read access for all users" ON orders FOR SELECT USING (true);
-- CREATE POLICY "Enable insert access for all users" ON orders FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Enable update access for all users" ON orders FOR UPDATE USING (true);
-- CREATE POLICY "Enable delete access for all users" ON orders FOR DELETE USING (true);
