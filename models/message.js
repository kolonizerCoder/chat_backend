const mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        trim: true,
    },

}, { timestamps: true });



module.exports = mongoose.model("Message", messageSchema);
