const Category = require('./category.model');

// Service to create a new category
const createCategory = async (data) => {
  return await Category.create(data);
};

// Service to get all category
const getAllCategory = async () => {
  return await Category.find().sort("-createdAt").populate('products');
};

// Service to get a specific category by ID
const getSpecificCategory = async (id) => {
  return await Category.findOne({ _id: id }).populate('products');
};

// Service to update a specific category
const updateSpecificCategory = async (id, data) => {
  return await Category.updateOne({ _id: id }, data, {
    runValidators: true
  });
};

// Service to delete a specific category
const deleteSpecificCategory = async (id) => {
  return await Category.deleteOne({ _id: id });
};

module.exports = {
  createCategory,
  getAllCategory,
  getSpecificCategory,
  updateSpecificCategory,
  deleteSpecificCategory
};
