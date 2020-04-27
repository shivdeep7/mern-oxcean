const mongoose = require("mongoose");
const uuid = require("uuid");

const LogsSchema = new mongoose.Schema({
    login: {
        token: String,
        loginTime: {
            type: Date,
            required: true,
            default: new Date()
        },
        logoutTime: Date,
        status: Boolean,
        username: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    },
    creationTime: {
        type: Date,
        require: true,
        default: new Date()
    },
    ip: String,
    requests: [{
        requestId: {
            type: String, 
            required: true,
            default: uuid(),
        },
        method: String,
        path: String,
        success: Boolean,
        status: Number,
        code: Number,
        payload: Object,
    }]
});

module.exports = Logs = mongoose.model("logs", LogsSchema);