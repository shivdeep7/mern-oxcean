/**
 *  
 * Purpose: File to handle /user route 
 * Original Author: Shivdeep Singh
 *  
 * 
 **/ 
const express = require("express")
const router = express.Router();
const brypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// Get the mongo models
const User = require("../../models/Users");

/**
 * 
 * @Route    GET /api/users/register
 * @Desc     Route to register a user
 * @Access   PUBLIC
 * 
 **/
router.post("/register", [
    check('name', "Name is required").not().isEmpty(),
    check('email', "Email is not valid").isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({min: 6})
] , async (req, res) => {
    
    // Get the validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    // Get the incoming data
    const { name, email, password } = req.body;

    // Check if the user exits in the database
    try {

        // Check user in mongoDB
        let user = await User.findOne({ email });

        if (user) {
            res.status(400).json({ error: [{msg: "User already exits"}]})
        }

        // Create a user instance 
        user = new User({
            name: name,
            email: email,
            password: password
        });

        // Encrypt the user password 
        const salt = await brypt.genSalt(10);
        user.password = await brypt.hash(password, salt);

        // Register a user in database
        await user.save();

        // Compose the payload
        const payload = {
            user: {
                id: user.id
            }
        }
        
        // Generate  a JSONWebToken
        jwt.sign(payload, config.get('jwtSecretKey'), {
            expiresIn: 3600
        }, (err, token) => {
            
            if (err) throw err;

            res.json({ token });

        });

    } catch (err) {
        
        // Log the error on console
        console.error(`Error: ${err}`);

        // Return the response
        return res.status(500).send("Server error")
    }

    

})  

module.exports = router;