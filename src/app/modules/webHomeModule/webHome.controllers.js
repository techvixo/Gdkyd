const webHomeServices = require('./webHome.services')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../../errors')
const sendResponse = require('../../../shared/sendResponse')
const fileUploader = require('../../../utils/fileUploader')

// Controller to initialize WebHome
const initializeWebHome = async (req, res) => {
  const webHome = await webHomeServices.initializeWebHome()

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'WebHome initialized successfully',
    data: webHome
  })
}

// Controller to get WebHome data
const getWebHome = async (req, res) => {
  const webHome = await webHomeServices.getWebHome()
  // if (!webHome) {
  //   throw new CustomError.NotFoundError('WebHome not found!')
  // }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    data: webHome
  })
}

// // Controller to update Featured Video
// const updateFeaturedVideo = async (req, res) => {
//   const videoData = req.body.featuredVideoUrl;
//   const updatedWebHome = await webHomeServices.updateFeaturedVideo(videoData);

//   if (!updatedWebHome) {
//     throw new CustomError.BadRequestError('Failed to update Featured Video!');
//   }

//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     status: 'success',
//     message: 'Featured Video updated successfully',
//     data: updatedWebHome,
//   });
// };

// // Controller to update Custom Parts Video
// const updateCustomPartsVideo = async (req, res) => {
//   const { customPartsVideoUrl } = req.body;
//   const updatedWebHome = await webHomeServices.updateCustomPartsVideo(customPartsVideoUrl);

//   if (!updatedWebHome) {
//     throw new CustomError.BadRequestError('Failed to update Custom Parts Video!');
//   }

//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     status: 'success',
//     message: 'Custom Parts Video updated successfully',
//     data: updatedWebHome,
//   });
// };

// Controller to add a CNC Machine Part
const addCncMachinePart = async (req, res) => {
  const partData = req.body

  // Upload image
  const imageUrl = await fileUploader(
    req.files,
    `cnc-machine-part-${partData.title_en}`,
    'image'
  )
  partData.image = imageUrl

  await webHomeServices.addCncMachinePart(partData)

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'CNC Machine Part created successfully',
  })
}

// Controller to delete a CNC Machine Part
const deleteCncMachinePart = async (req, res) => {
  const { id } = req.params
  const updatedWebHome = await webHomeServices.deleteCncMachinePart(id)

  if (!updatedWebHome) {
    throw new CustomError.NotFoundError(
      'CNC Machine Part not found or already deleted!'
    )
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'CNC Machine Part deleted successfully',
  })
}

// Controller to add a custom Part
const addCustomPart = async (req, res) => {
  const { video_url } = req.body

  const customParts = await webHomeServices.createCustomPartsVideo(video_url)
  if (!customParts) {
    throw new CustomError.BadRequestError('Failed to create new custom parts!')
  }

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'Custom parts video successfully added',
  })
}

// Controller to delete a custom Parts video
const deleteCustomPart = async (req, res) => {
  const updatedWebHome = await webHomeServices.deleteCustomPartsVideo()

  if (!updatedWebHome) {
    throw new CustomError.NotFoundError(
      'Custom Part video not found or already deleted!'
    )
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Custom Part video deleted successful',
  })
}

// Controller to add a custom Part
const addFeaturedVideo = async (req, res) => {
  const { left_side_video_url, right_side_video_url } = req.body

  const featured_video = await webHomeServices.createFeaturedVideo(left_side_video_url, right_side_video_url)
  if (!featured_video) {
    throw new CustomError.BadRequestError('Failed to add featured video url!')
  }

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'Featured video url successfully added',
  })
}

// Controller to delete a CNC Machine Part
const deleteFeaturedVideo = async (req, res) => {
  const {side} = req.query
  console.log(side)
  const featured_video = await webHomeServices.deleteFeaturedVideo(side)

  if (!featured_video) {
    throw new CustomError.NotFoundError(
      'Featured video url not found or already deleted!'
    )
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Featured video url deleted successful',
  })
}

// Controller to update an individual CNC Machine Part
const updateCncMachinePart = async (req, res) => {
  const { id } = req.params;
  const partData = req.body;

  // Upload new image if provided
  if (req.files) {
    const imageUrl = await fileUploader(
      req.files,
      `cnc-machine-part-${partData.title_en || id}`,
      'image'
    );
    partData.image = imageUrl;
  }

  const updatedPart = await webHomeServices.updateCncMachinePart(id, partData);

  if (!updatedPart) {
    throw new CustomError.NotFoundError('CNC Machine Part not found or update failed!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'CNC Machine Part updated successfully'
  });
};

module.exports = {
  initializeWebHome,
  getWebHome,
  addCncMachinePart,
  deleteCncMachinePart,
  addCustomPart,
  deleteCustomPart,
  addFeaturedVideo,
  deleteFeaturedVideo,
  updateCncMachinePart
}
