const Video = require('./video.model')

// Service to create a new video
const createVideo = async (data) => {
  return await Video.create(data)
}

// Service to get all videos
const getAllVideos = async () => {
  return await Video.find().sort('-createdAt').select('-createdAt -updatedAt -__v')
}

// Service to delete a specific partner
const deleteSpecificVideo = async (id) => {
  return await Video.deleteOne({ _id: id })
}

module.exports = {
  createVideo,
  getAllVideos,
  deleteSpecificVideo
}
