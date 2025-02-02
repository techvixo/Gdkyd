const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    name_en: {
        type: String,
        required: true,
    },
    name_cn: {
        type: String,
        required: true,
    },
    image: String
}, {
    timestamps: true,
})


const Certificate = mongoose.model('certificate', certificateSchema)

module.exports = Certificate;