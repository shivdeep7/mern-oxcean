// Get the required module
const express = require("express");
const connectDB = require("./config/db");
const Composer = require("./src/composer/composer.js")

const app = express();

// Parse the json
app.use(express.json());
// Connect to the database
connectDB();


 (async () => {
    const compose = new Composer();
    await compose.loadServices();

    await compose.deploy();
})()

