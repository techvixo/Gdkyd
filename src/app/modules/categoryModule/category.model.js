const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: String,
      unique: true,
      trim: true,
      required: true
    },
    name_en: {
      type: String,
      required: true
    },
    name_cn: {
      type: String,
      required: true
    },
    description_en: String,
    description_cn: String,
    status: {
      type: String,
      enum: ['active', 'disable'],
      default: 'active'
    },
    image: String,
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
      }
    ]
  },
  {
    timestamps: true
  }
)

const Category = mongoose.model('category', categorySchema)

module.exports = Category
