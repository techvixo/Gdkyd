const partnerServices = require('./honor.services');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const sendResponse = require('../../../shared/sendResponse');
const fileUploader = require('../../../utils/fileUploader');

// Controller for creating a new partner
const createPartner = async (req, res) => {
  const partnerData = req.body;

  // Upload image if present
  if (req.files || req.files?.length > 0) {
    const imagePath = await fileUploader(req.files, `honor-image-${partnerData.name_en}`, 'image');
    partnerData.image = imagePath;
  }

  const partner = await partnerServices.createPartner(partnerData);
  if (!partner) {
    throw new CustomError.BadRequestError('Failed to create new honor!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'Honor creation successful',
    data: partner,
  });
};

// Controller for getting all partners
const getAllPartners = async (req, res) => {
  const partners = await partnerServices.getAllPartners();
  // if (partners.length === 0) {
  //   throw new CustomError.NotFoundError('No partners found!');
  // }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Honors retrieved successfully',
    data: partners,
  });
};

// Controller for getting a specific partner by ID
const getSpecificPartner = async (req, res) => {
  const { id } = req.params;

  const partner = await partnerServices.getSpecificPartner(id);
  if (!partner) {
    throw new CustomError.NotFoundError('Honor not found!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Honor retrieved successfully',
    data: partner,
  });
};

// Controller for updating a specific partner
const updateSpecificPartner = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // If there's a new image to upload
  if (req.files || req.files?.length > 0) {
    const imagePath = await fileUploader(req.files, `honor-image-${updateData.name_en}`, 'image');
    updateData.image = imagePath;
  }

  const partner = await partnerServices.updateSpecificPartner(id, updateData);
  if (!partner.modifiedCount) {
    throw new CustomError.NotFoundError('Honor update failed!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Honor updated successfully',
  });
};

// Controller for deleting a specific partner
const deleteSpecificPartner = async (req, res) => {
  const { id } = req.params;

  const result = await partnerServices.deleteSpecificPartner(id);
  if (!result.deletedCount) {
    throw new CustomError.NotFoundError('Honor deletion failed!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Honor deleted successfully',
  });
};

module.exports = {
  createPartner,
  getAllPartners,
  getSpecificPartner,
  updateSpecificPartner,
  deleteSpecificPartner,
};
