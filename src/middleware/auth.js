const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const Users = require("../models/Users.js");
const Groups = require("../models/Groups.js");
const Roles = require("../models/Roles.js");
const authentication = require("./authorization");

// Middleware to check if user provided a valid token
module.exports = auth = async (req, res, next) => {
    
    // Get the token
    const token = req.header("x-auth-token");
    if (!token) { res.status(401).json({ "msg": "Access denied, No token provided." }); }

    // Verify the token
    try {

        const decoded =  jwt.verify(token, config.get("jwtSecretKey"));
        req.token = token; // Token for logging purposes
        req.userId = decoded.user.id; // userId for loggin purposes
        
        req.user = await Users.findById(req.userId).populate({
            path: 'groups',
            populate: {
                path: 'roles',
                populate: 'permissions.service'
            }
        }).select("-password");
     
        // Move to the next middleware
        return authentication(req, res, next);

    } catch (err) {

        console.log(err);
        return res.status(401).json({ "msg": "Access denied, Invalid token" });

    }

 


}