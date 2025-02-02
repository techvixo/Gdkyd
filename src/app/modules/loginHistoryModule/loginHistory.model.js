const mongoose = require('mongoose');

const loginHistorySchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
    },
    ipAddress: String,
    userAgent: String
}, {
    timestamps: true
})

const LoginHistory = mongoose.model('loginHistory', loginHistorySchema)
module.exports = LoginHistory