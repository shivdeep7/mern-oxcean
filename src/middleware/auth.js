const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

// Middleware to check if user provided a valid token
module.exports = auth = async (req, res, next) => {
    
    // Get the token
    const token = req.header("x-auth-token");
    if (!token) { res.status(401).json({ "msg": "Access denied, No token provided." }); }

    // Verify the token
    try {

        const decoded =  jwt.verify(token, config.get("jwtSecretKey"));
        req.user = decoded.user;
        
        // Move to the next middleware
        next();

    } catch (err) {

        return res.status(401).json({ "msg": "Access denied, Invalid token" });

    }

 


}