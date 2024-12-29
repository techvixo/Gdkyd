const bannerServices = require('./banner.services');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const sendResponse = require('../../../shared/sendResponse');
const fileUploader = require('../../../utils/fileUploader');

// Controller to create a new banner
const createBanner = async (req, res) => {
  const bannerData = req.body;

  // Upload banner image if present
  if (req.files || req.files.banner_image) {
    const bannerImagePath = await fileUploader(req.files, `banner-${bannerData.title_en}`, 'banner_image');
    bannerData.banner_image = bannerImagePath;
  }

  const banner = await bannerServices.createBanner(bannerData);
  if (!banner) {
    throw new CustomError.BadRequestError('Failed to create new banner!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'Banner created successfully',
    data: banner,
  });
};

// Controller to get all banners
const getAllBanners = async (req, res) => {
  const banners = await bannerServices.getAllBanners();
  // if (banners.length === 0) {
  //   throw new CustomError.NotFoundError('No banners found!');
  // }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Banners retrieved successfully',
    data: banners,
  });
};

// Controller to get a specific banner by ID
const getSpecificBanner = async (req, res) => {
  const { id } = req.params;

  const banner = await bannerServices.getSpecificBanner(id);
  // if (!banner) {
  //   throw new CustomError.NotFoundError('Banner not found!');
  // }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Banner retrieved successfully',
    data: banner,
  });
};

// Controller to update a specific banner
const updateSpecificBanner = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // Update banner image if present
  if (req.files || req.files.banner_image) {
    const bannerImagePath = await fileUploader(req.files, `banner-${updateData.title_en}`, 'banner_image');
    updateData.banner_image = bannerImagePath;
  }

  const banner = await bannerServices.updateSpecificBanner(id, updateData);
  if (!banner.modifiedCount) {
    throw new CustomError.NotFoundError('Banner update failed!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Banner updated successfully',
  });
};

// Controller to delete a specific banner
const deleteSpecificBanner = async (req, res) => {
  const { id } = req.params;

  const result = await bannerServices.deleteSpecificBanner(id);
  if (!result.deletedCount) {
    throw new CustomError.NotFoundError('Banner deletion failed!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Banner deleted successfully',
  });
};

module.exports = {
  createBanner,
  getAllBanners,
  getSpecificBanner,
  updateSpecificBanner,
  deleteSpecificBanner,
};
