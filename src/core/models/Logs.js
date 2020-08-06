const mongoose = require("mongoose");
const uuid = require("uuid");

const LogsSchema = new mongoose.Schema({
    method: String,
    path: String,
    ip: String,
    success: Boolean,
    code: Number,
    payload: Object,
    status: Number,
    requestData: Object,
    client: String,
    token: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    creationTime: {
        type: Date,
        require: true,
        default: new Date()
    },
   
});

module.exports = Logs = mongoose.model("logs", LogsSchema);