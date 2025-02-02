const { StatusCodes } = require('http-status-codes')
const sendResponse = require('../../../shared/sendResponse')
const CustomError = require('../../errors')
const videoServices = require('./video.services')

// controller for craete videos
const createVideo = async (req, res) => {
  const videos = req.body.videos_url

  // Ensure videos is an array
  if (!Array.isArray(videos) || videos.length === 0) {
    throw new CustomError.BadRequestError(
      'No videos provided or invalid formate!'
    )
  }

  await Promise.all(
    videos.map(async (video) => {
      const createdVideo = await videoServices.createVideo({ link: video })
      if (!createdVideo) {
        throw new CustomError.BadRequestError('Failed to add video')
      }
    })
  )

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'Video creation successful'
  })
}

// Controller for getting all videos
const getAllVideos = async (req, res) => {
  const videos = await videoServices.getAllVideos()

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Videos retrieved successfully',
    data: videos
  })
}

// Controller for deleting a specific partner
const deleteSpecificVideo = async (req, res) => {
  const { id } = req.params

  const result = await videoServices.deleteSpecificVideo(id)
  if (!result.deletedCount) {
    throw new CustomError.NotFoundError('Video deletion failed!')
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Video deleted successfully'
  })
}

module.exports = {
  createVideo,
  getAllVideos,
  deleteSpecificVideo
}
