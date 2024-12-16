const mongoose = require('mongoose')

const heroSchema = new mongoose.Schema(
  {
    title_en: String,
    title_cn: String,
    description_en: String,
    description_cn: String,
    link: String,
    image: String,
    visitCount: Number,
  },
  {
    timestamps: true
  }
)

const Hero = mongoose.model('hero', heroSchema)
module.exports = Hero
