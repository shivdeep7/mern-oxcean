const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    receiver: [],
    title: {
        type: String,
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

module.exports = Notification = mongoose.model("Notifications", NotificationSchema);