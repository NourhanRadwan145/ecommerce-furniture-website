

//#region Imports
const express = require('express');
const app = express();
const PORT = process.env.PORT || 7000;
const UserRoutes = require("../Routes/UserRoute")
const productRoute = require('../Routes/productsRoute');
const orderRoute = require('../Routes/OrderRoute');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
//#endregion

mongoose.connect("mongodb://127.0.0.1:27017/E-Commerce");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}))
app.use(cookieParser())

//#region Routes
app.use(cors({ origin: 'http://localhost:4200' }));
app.use("/api/users", UserRoutes)
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
//#endregion

app.listen(PORT,()=>{
    console.log("Runs at: http://localhost:"+PORT);
})
