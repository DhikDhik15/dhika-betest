'use restrict';

// declare constants
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

/*parse requests of content-type - application/json*/
app.use(express.json());

/*parse requests of content-type - application/x-www-form-urlencoded*/
app.use(
    express.urlencoded({
        extended: true,
    })
);

// define port
const SERVICE = process.env.PORT;
app.listen(SERVICE, () => {
    console.log(`--->Service on PORT ${SERVICE}<---`);
});

/*MONGODB*/
mongoose.connect('mongodb://127.0.0.1:27017/db_dhika_betest');
const MONGODB = process.env.PORT_MONGO;

mongoose.connection
    .once("open", function () {
    console.log(`--->DB on PORT ${MONGODB}<---`);
})
    .on("error", function (error) {
    console.log("error is:", error);
});