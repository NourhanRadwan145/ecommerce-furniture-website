

//#region Imports
const express = require('express');
const app = express();
const PORT = process.env.PORT || 7000;

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/E-Commerce");

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//#endregion


app.listen(PORT,()=>{
    console.log("Runs at: http://localhost:"+PORT);
})

