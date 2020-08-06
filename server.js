// Get the required module
const express = require("express");
const Logger = require("./src/core/middleware/Logger.js");
const connectDB = require("./config/db");
const path = require("path");
const Composer = require("./src/composer/composer.js")

const app = express();

// Parse the json
app.use(express.json());

// Connect to the database
connectDB();

// Initial handler
app.use(Logger);

 (async () => {
    const compose = new Composer();
    await compose.loadServices();
    console.log('\x1b[34m%s\x1b[0m', `[Adding service]`, "Loading Core");
    //compose.loadCore(path.join(__dirname, "/src/core"));  
    compose.compose();
    console.log(Core);
    Core.models.Application.Applications;
})()

/* Get the routes
const users = require("./src/core/routes/api/users");
const auth = require("./src/core/routes/api/auth");
const roles = require("./src/core/routes/api/roles");
const groups = require("./src/core/routes/api/Groups");
const services = require("./src/core/routes/api/services");



// Use the routes 
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/roles", roles);
app.use("/api/groups", groups);
app.use("/api/services", services);
*/


// Get the port env variable or default 5000
const PORT = process.env.PORT || 5000;

// Listen to the incoming request to the port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});