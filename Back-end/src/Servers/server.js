

//#region Imports
const express = require('express');
const app = express();
const PORT = process.env.PORT || 7000;
const UserRoutes = require("../Routes/UserRoute")
const CartRoutes = require("../Routes/CartRoute")

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/E-Commerce");

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//#endregion
 // ----------------------------------- Use Routes -------------------------------
app.use("/api/users", UserRoutes)
app.use("/api/carts", CartRoutes)

app.listen(PORT,()=>{
    console.log("Runs at: http://localhost:"+PORT);
})

