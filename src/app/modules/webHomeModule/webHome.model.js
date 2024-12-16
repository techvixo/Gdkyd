const mongoose = require('mongoose')

const webHomeSchema = new mongoose.Schema(
  {
    cnc_machine_parts: [
      {
        image: String,
        title_en: String,
        title_cn: String
      }
    ],
    custom_parts_video: {
      type: String,
      default: null
    },
    featured_video: {
      left_side_video: {
        type: String,
        default: null
      },
      right_side_video: {
        type: String,
        default: null
      }
    }
  },
  {
    timestamps: true
  }
)

const WebHome = mongoose.model('webHome', webHomeSchema)
module.exports = WebHome
