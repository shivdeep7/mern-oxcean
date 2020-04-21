const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require('express-validator');

// Get the custome middleware
const middleware = require("../../middleware/auth");

// Get the models
const User = require("../../models/Users");

/**
 * @Route   GET /api/users/me
 * @Desc    Get the user infomrmation
 * @Access  Private
 **/
router.get("/", middleware, async (req, res) => {

    // Get the user data
    try {

        const user = await User.findById(req.user.id).select("-password");
        res.json(user);

    } catch(err) {

        console.error(`Error: ${err.message}`);
        res.status(500).json({"msg": "Server Error"});

    }
    
});

/**
 *  @Route   POST /api/users/login
 *  @Desc    Authenticate user using email and password
 *  @Access  Public
 **/ 
router.post("/login", [
    check("email", "Please provide email address").isEmail(),
    check("password", "Please provide the password").exists()
], async (req, res) => {

    // Check if there are any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        return res.status(400).json(errors);
    }

    // Get the request data
    const { email, password } = req.body;

    try {

        // Check if email is valid
        const user = await User.findOne({ email });

        if (!email) {
            return res.status(400).json({ errors: [{"msg": "Invalid login credentials"}]});
        }

        // Check if password is valid
        passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ errors: [{"msg": "Invalid login credentials"}]});
        }

        // Compose a payload
        const payload = {
            user: {
                id: user.id
            }
        }

        // Return the token 
        jwt.sign(payload, config.get("jwtSecretKey"), { expiresIn: 3600}, (err, token) => {
            if (err) throw err;
            // Send back the token
            return res.json({ token });
        });

    } catch (err) {

        console.error(`Error: ${err.message}`);
        return res.status(500).json(err);

    }
 

});

module.exports = router;