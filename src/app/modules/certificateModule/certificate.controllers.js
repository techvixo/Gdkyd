const certificateServices = require('./certificate.services')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../../errors')
const sendResponse = require('../../../shared/sendResponse')
const fileUploader = require('../../../utils/fileUploader')

// Controller for creating a new certificate
const createCertificate = async (req, res) => {
  const certificateData = req.body

  const imagePath = await fileUploader(
    req.files,
    `certificate-image-${certificateData.name_en}`,
    'image'
  )
  certificateData.image = imagePath

  const certificate =
    await certificateServices.createCertificate(certificateData)
  if (!certificate) {
    throw new CustomError.BadRequestError('Failed to create new certificate!')
  }

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'Certificate creation successful',
    data: certificate
  })
}

// Controller for getting all certificates
const getAllCertificates = async (req, res) => {
  const certificates = await certificateServices.getAllCertificates()
  // if (certificates.length === 0) {
  //   throw new CustomError.NotFoundError('No certificates found!')
  // }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Certificates retrieved successfully',
    data: certificates
  })
}

// Controller for getting a specific certificate by ID
const getSpecificCertificate = async (req, res) => {
  const { id } = req.params

  const certificate = await certificateServices.getSpecificCertificate(id)
  if (!certificate) {
    throw new CustomError.NotFoundError('Certificate not found!')
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Certificate retrieved successfully',
    data: certificate
  })
}

// Controller for updating a specific certificate
const updateSpecificCertificate = async (req, res) => {
  const { id } = req.params
  const updateData = req.body

  // If there's a new image to upload
  if (req.files || req.files?.length > 0) {
    const imagePath = await fileUploader(
      req.files,
      `certificate-image-${updateData.name_en}`,
      'image'
    )
    updateData.image = imagePath
  }

  const certificate = await certificateServices.updateSpecificCertificate(
    id,
    updateData
  )
  if (!certificate.modifiedCount) {
    throw new CustomError.NotFoundError('Certificate update failed!')
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Certificate updated successfully'
  })
}

// Controller for deleting a specific certificate
const deleteSpecificCertificate = async (req, res) => {
  const { id } = req.params

  const result = await certificateServices.deleteSpecificCertificate(id)
  if (!result.deletedCount) {
    throw new CustomError.NotFoundError('Certificate deletion failed!')
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Certificate deleted successfully'
  })
}

module.exports = {
  createCertificate,
  getAllCertificates,
  getSpecificCertificate,
  updateSpecificCertificate,
  deleteSpecificCertificate
}
