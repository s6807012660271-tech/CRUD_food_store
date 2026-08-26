const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const foodRoutes = require('./routes/foodRoute');
const locationRoutes = require('./routes/locationRoute');
const orderRoutes = require('./routes/orderRoute');
const PORT = process.env.PORT || 3000;

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(foodRoutes);
app.use(locationRoutes);
app.use(orderRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
