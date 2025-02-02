const Banner = require('./banner.model');

// Service to create a new banner
const createBanner = async (data) => {
  return await Banner.create(data);
};

// Service to get all banners
const getAllBanners = async () => {
  return await Banner.find().sort('-createdAt');
};

// Service to get a specific banner by ID
const getSpecificBanner = async (id) => {
  return await Banner.findOne({ purpose: id });
};

// Service to update a specific banner
const updateSpecificBanner = async (id, data) => {
  return await Banner.updateOne({ purpose: id }, data, { runValidators: true });
};

// Service to delete a specific banner
const deleteSpecificBanner = async (id) => {
  return await Banner.deleteOne({ purpose: id });
};

module.exports = {
  createBanner,
  getAllBanners,
  getSpecificBanner,
  updateSpecificBanner,
  deleteSpecificBanner,
};
