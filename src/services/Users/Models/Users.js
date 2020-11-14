const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    groups: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Groups",
        default: mongoose.Types.ObjectId("5e88de511c9d440000e1c257")
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);