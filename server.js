// Get the required module
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Parse the json
app.use(express.json());

// Connect to the database
connectDB();

// Get the routes
const users = require("./src/routes/api/users");
const auth = require("./src/routes/api/auth");
const roles = require("./src/routes/api/roles");

// Get the port env variable or default 5000
const PORT = process.env.PORT || 5000;

// Use the routes 
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/Roles", roles);

// Listen to the incoming request to the port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});