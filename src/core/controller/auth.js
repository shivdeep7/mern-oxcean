
// Get the user info-
const userInfo = async (req, res) => {

    // Get the user data
    try {

        const user = await User.findById(req.user.id).select("-password");
        res.json(user);

    } catch(err) {

        console.error(`Error: ${err.message}`);
        res.status(500).json({"msg": "Server Error"});

    }

    
    
}

module.exports = {userInfo};