const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require('express-validator');

// Get the custome middleware
const auth = require("../../middleware/auth");
// Get the models
const User = require("../../models/Users");
// Get the controller
const controller = require("../../controller/auth");
// Get the response handler 
const handler = require("../../middleware/handler")


/**
 * @Route   GET /api/users/me
 * @Desc    Get the user infomrmation
 * @Access  Private
 **/
router.get(
    "/", 
    auth, 
    controller.userInfo
);

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

        if (!user) {
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