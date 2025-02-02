const Portfolio = require('./portfolio.model');

// Service to create a new portfolio item
const createPortfolio = async (data) => {
  return await Portfolio.create(data);
};

// Service to get all portfolio items
const getAllPortfolios = async () => {
  return await Portfolio.find().sort('-createdAt');
};

// Service to get a specific portfolio item by ID
const getSpecificPortfolio = async (id) => {
  return await Portfolio.findOne({ _id: id });
};

// Service to update a specific portfolio item
const updateSpecificPortfolio = async (id, data) => {
  return await Portfolio.updateOne({ _id: id }, data, {
    runValidators: true,
  });
};

// Service to delete a specific portfolio item
const deleteSpecificPortfolio = async (id) => {
  return await Portfolio.deleteOne({ _id: id });
};

module.exports = {
  createPortfolio,
  getAllPortfolios,
  getSpecificPortfolio,
  updateSpecificPortfolio,
  deleteSpecificPortfolio,
};
