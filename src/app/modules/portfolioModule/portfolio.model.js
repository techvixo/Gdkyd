const mongoose = require('mongoose')

const portfolioSchema = new mongoose.Schema(
  {
    name_en: {
        type: String,
        required: true,
    },
    name_cn: {
        type: String,
        required: true,
    },
    description_en: String,
    description_cn: String,
    image: String,
    url: String,
    status: {
        type: String,
        enum: ["active", "disable"],
        default: 'active',
    },
    addedBy: {
        adminId: String,
        name_en: String,
        name_cn: String,
        email: String
    }
  },
  {
    timestamps: true
  }
)

const Portfolio = mongoose.model('portfolio', portfolioSchema)

module.exports = Portfolio
