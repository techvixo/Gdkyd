const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})


const Video = mongoose.model('video', videoSchema)
module.exports = Video;