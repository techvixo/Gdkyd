const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    productId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    title_en: {
        type: String,
        required: true,
    },
    title_cn: {
        type: String,
        required: true,
    },
    subTitle_en: {
        type: String,
        required: true,
    },
    subTitle_cn: {
        type: String,
        required: true,
    },
    description_en: String,
    description_cn: String,
    status: {
        type: String,
        enum: ["active", "disable"],
        default: "active",
    },
    images: [String],
    configurations: {
        type: mongoose.Schema.Types.Mixed, 
        default: {} 
    },
    category: {
        categoryId: String,
        title_en: String,
        title_cn: String,
    },
    createdBy: {
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

const Product = mongoose.model('product', productSchema)

module.exports = Product
