const Product = require('./product.model');

// Service to create a new product
const createProduct = async (data) => {
  return await Product.create(data);
};

// Service to get all products
const getAllProducts = async () => {
  return await Product.find().sort('-createdAt');
};

// Service to get a specific product by ID
const getSpecificProduct = async (id) => {
  return await Product.findOne({ _id: id });
};

// Service to update a specific product
const updateSpecificProduct = async (id, data) => {
  return await Product.updateOne({ _id: id }, data, {
    runValidators: true
  });
};

// Service to delete a specific product
const deleteSpecificProduct = async (id) => {
  return await Product.deleteOne({ _id: id });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSpecificProduct,
  updateSpecificProduct,
  deleteSpecificProduct,
};
