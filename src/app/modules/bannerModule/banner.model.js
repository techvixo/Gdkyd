const mongoose = require('mongoose')


const bannerSchema = new mongoose.Schema({
    purpose: {
        type: String,
        enum: {
            values: ['home', 'about_us', 'portfolio', 'portfolio_single', 'blog', 'blog_single', 'contact_us', 'services', 'cnc_services', 'cnc_services_details', 'material_machine_services', 'material_machine_services_details', 'surface_finishing_service', 'surface_finishing_services_details'],
            message: '{VALUE} not accepted as purpose. Please use one of the following: home, about_us, portfolio, portfolio_single, blog, blog_single, contact_us, services, cnc_services, cnc_services_details, material_machine_services, material_machine_services_details, surface_finishing_service, surface_finishing_services_details. '
        }
    },
    title_en: {
        type: String,
        required: true
    },
    title_cn: {
        type: String,
        required: true
    },
    description_en: {
        type: String,
        required: true,
    },
    description_cn: {
        type: String,
        required: true,
    },
    banner_image: String
}, {
    timestamps: true
})

const Banner = mongoose.model('banner', bannerSchema)

module.exports = Banner;