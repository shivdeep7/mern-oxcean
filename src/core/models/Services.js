
const mongoose = require("mongoose");

const ServicesSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    route: {
        type: String, 
        required: true
    },
    data: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

module.exports = Services = mongoose.model('Services', ServicesSchema);