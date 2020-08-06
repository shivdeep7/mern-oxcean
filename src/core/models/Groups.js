const mongoose = require("mongoose");

const GroupsSchema = new mongoose.Schema({

    name: {
        type: String, 
        required: true
    },
    status: {
        type:  Boolean, 
        require: true,
        default: true
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Roles'
    }]
    
});

module.exports = Groups = mongoose.model('Groups', GroupsSchema);