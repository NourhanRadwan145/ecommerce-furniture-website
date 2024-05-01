const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 7000;
const UserRoutes = require("../Routes/UserRoute");
const productRoute = require('../Routes/productsRoute');
const orderRoute = require('../Routes/OrderRoute');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//#endregion
mongoose.connect("mongodb+srv://mohamedalgharabawy1:E_Commerce@cluster0.6rct3ri.mongodb.net/E-Commerce?retryWrites=true&w=majority&appName=Cluster0");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}))
app.use(cookieParser())


//#region Routes
app.use("/api/users", UserRoutes)
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