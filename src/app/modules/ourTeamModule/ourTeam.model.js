const mongoose = require('mongoose')


const ourTeamSchema = new mongoose.Schema({
    name_en: {
        type: String,
        required: true
    },
    name_cn: {
        type: String,
        required: true
    },
    image: String,
    role: {
        type: String,
        enum: {
            values: ["Owner", "Admin", "Manager", "Employee"],
            message: '{VALUE} is not accepted as role. You have to use Owner/Admin/Manager/Employee.'
        },
        required: true
    },
    experience_en: String,
    experience_cn: String,
    language: [String],
    address_en: {
        type: String,
        required: true,
    },
    address_cn: {
        type: String,
        required: true,
    },
    university_en: {
        type: String,
        required: true
    },
    university_cn: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'disable'],
        default: "active"
    },
}, {
    timestamps: true,
})

const OurTeam = mongoose.model('ourTeam', ourTeamSchema);

module.exports = OurTeam