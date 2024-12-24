const mongoose = require('mongoose');

const parnterSchema = new mongoose.Schema({
    name_en: {
        type: String,
        required: true,
    },
    name_cn: {
        type: String,
        required: true,
    },
    image: String,
    status: {
        type: String,
        enum: ["active", "disable"],
        default: "active",
    }
}, {
    timestamps: true
})


const Honor = mongoose.model('honor', parnterSchema)
module.exports = Honor;