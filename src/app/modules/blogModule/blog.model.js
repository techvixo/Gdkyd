const mongoose = require('mongoose')

const mongooseSchema = new mongoose.Schema(
  {
    name_en: {
      type: String,
      required: true
    },
    name_cn: {
      type: String,
      required: true
    },
    description_en: [{
        type: String,
        required: true,
    }],
    description_cn: [{
        type: String,
        required: true,
    }],
    heading_image: String,
    // featured_images: [String],
    // author: {
    //     name_en: String,
    //     name_cn: String,
    //     adminId: String,
    //     email: String,
    // },
    status: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

const Blog = mongoose.model('blog', mongooseSchema)
module.exports = Blog
