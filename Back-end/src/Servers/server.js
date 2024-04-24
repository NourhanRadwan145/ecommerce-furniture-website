const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 7000;
const UserRoutes = require("../Routes/UserRoute");
const productRoute = require('../Routes/productsRoute');
const orderRoute = require('../Routes/OrderRoute');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const productsModel = require("../Models/productsModel");

// Enable CORS
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/E-Commerce");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//#region Routes
app.use("/api/users", UserRoutes);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
//#endregion

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log("Runs at: http://localhost:" + PORT);
});
