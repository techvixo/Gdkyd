const sendResponse = require('../../../shared/sendResponse');
const fileUploader = require('../../../utils/fileUploader');
const IdGenerator = require('../../../utils/idGenerator');
const CustomError = require('../../errors');
const categoryServices = require('./category.services');
const { StatusCodes } = require('http-status-codes');

// Controller for creating a new category
const createCategory = async (req, res) => {
  const categoryData = req.body;
  const categoryId = IdGenerator.generateId()

  categoryData.categoryId = categoryId

  if(req.files){
    const categoryImagePath = await fileUploader(req.files, `category-image-${categoryData.title}`, "image");
  categoryData.image = categoryImagePath;
  }

  const category = await categoryServices.createCategory(categoryData);
  if (!category) {
    throw new CustomError.BadRequestError('Failed to create new category!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'Category creation successful',
    data: category,
  });
};

// Controller for getting a specific category
const getAllCategories = async (req, res) => {
  const categories = await categoryServices.getAllCategory();
  // if (categories.length === 0) {
  //   throw new CustomError.NotFoundError('No categories found!');
  // }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Categories retrive successful',
    data: categories,
  });
};

// Controller for getting a specific category
const getSpecificCategory = async (req, res) => {
  const { id } = req.params;

  const category = await categoryServices.getSpecificCategory(id);
  if (!category) {
    throw new CustomError.NotFoundError('Category not found!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Category retrive successful',
    data: category,
  });
};

// Controller for updating a specific category
const updateSpecificCategory = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // If there's a new image to upload
  if (req.files || req.files?.length > 0) {
    const categoryImagePath = await fileUploader(req.files, `category-image-${updateData.title}`, "image");
    updateData.image = categoryImagePath;
  }

  const category = await categoryServices.updateSpecificCategory(id, updateData);
  if (!category.modifiedCount) {
    throw new CustomError.NotFoundError('Category update failed!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Category updated successful',
  });
};

// Controller for deleting a specific category
const deleteSpecificCategory = async (req, res) => {
  const { id } = req.params;

  const result = await categoryServices.deleteSpecificCategory(id);
  if (!result.deletedCount) {
    throw new CustomError.NotFoundError('Category deletion failed!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Category deleted successful',
  });
};

module.exports = {
  createCategory,
  getAllCategories,
  getSpecificCategory,
  updateSpecificCategory,
  deleteSpecificCategory,
};
