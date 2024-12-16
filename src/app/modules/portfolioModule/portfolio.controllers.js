const portfolioServices = require('./portfolio.services');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const sendResponse = require('../../../shared/sendResponse');
const fileUploader = require('../../../utils/fileUploader');

// Controller for creating a new portfolio item
const createPortfolio = async (req, res) => {
  const portfolioData = req.body;

  // Upload image if present
  if (req.files || req.files?.length > 0) {
    const portfolioImagePath = await fileUploader(req.files, `portfolio-image-${portfolioData.name}`, 'image');
    portfolioData.image = portfolioImagePath;
  }

  const portfolio = await portfolioServices.createPortfolio(portfolioData);
  if (!portfolio) {
    throw new CustomError.BadRequestError('Failed to create new portfolio!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'Portfolio creation successful',
    data: portfolio,
  });
};

// Controller for getting all portfolio items
const getAllPortfolios = async (req, res) => {
  const portfolios = await portfolioServices.getAllPortfolios();
  // if (portfolios.length === 0) {
  //   throw new CustomError.NotFoundError('No portfolios found!');
  // }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Portfolios retrieved successfully',
    data: portfolios,
  });
};

// Controller for getting a specific portfolio item by ID
const getSpecificPortfolio = async (req, res) => {
  const { id } = req.params;

  const portfolio = await portfolioServices.getSpecificPortfolio(id);
  if (!portfolio) {
    throw new CustomError.NotFoundError('Portfolio not found!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Portfolio retrieved successfully',
    data: portfolio,
  });
};

// Controller for updating a specific portfolio item
const updateSpecificPortfolio = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // If there's a new image to upload
  if (req.files || req.files?.length > 0) {
    const portfolioImagePath = await fileUploader(req.files, `portfolio-image-${updateData.name}`, 'image');
    updateData.image = portfolioImagePath;
  }

  const portfolio = await portfolioServices.updateSpecificPortfolio(id, updateData);
  if (!portfolio.modifiedCount) {
    throw new CustomError.NotFoundError('Portfolio update failed!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Portfolio updated successfully',
  });
};

// Controller for deleting a specific portfolio item
const deleteSpecificPortfolio = async (req, res) => {
  const { id } = req.params;

  const result = await portfolioServices.deleteSpecificPortfolio(id);
  if (!result.deletedCount) {
    throw new CustomError.NotFoundError('Portfolio deletion failed!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Portfolio deleted successfully',
  });
};

module.exports = {
  createPortfolio,
  getAllPortfolios,
  getSpecificPortfolio,
  updateSpecificPortfolio,
  deleteSpecificPortfolio,
};
