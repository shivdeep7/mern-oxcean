const express = require("express");
const router = express.Router();

// Get the custome middleware
const auth = require("../../middleware/auth");

// Get the models
const User = require("../../models/Users");

/**
 * @Route   GET /api/users/me
 * @Desc    Get the user infomrmation
 * @Access  Private
 **/
router.get("/me", auth, async (req, res) => {

    // Get the user data
    try {

        const user = await User.findById(req.user.id).select("-password");
        res.json(user);

    } catch(err) {

        console.error(`Error: ${err.message}`);
        res.status(500).json({"msg": "Server Error"});

    }
    
});

module.exports = router;