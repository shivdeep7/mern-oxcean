const mongoose = require("mongoose");
const Schema = new mongoose.Schema();

const NotificationSchema = Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    receiver: [{

    }],
    title: {
        Type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },  
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "messageType"
    },
    initiator: {
        type: mongoose.Schema.Types.ObjectId,

    },
    request: {
        type: mongoose.Schema.Types.ObjectId,
    }
});

module.exports = NotificationSchema = mongoose.model("Notifications", Notifer);