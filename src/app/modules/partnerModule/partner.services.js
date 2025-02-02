const Partner = require('./partner.model');

// Service to create a new partner
const createPartner = async (data) => {
  return await Partner.create(data);
};

// Service to get all partners
const getAllPartners = async () => {
  return await Partner.find().sort('-createdAt');
};

// Service to get a specific partner by ID
const getSpecificPartner = async (id) => {
  return await Partner.findOne({ _id: id });
};

// Service to update a specific partner
const updateSpecificPartner = async (id, data) => {
  return await Partner.updateOne({ _id: id }, data, {
    runValidators: true,
  });
};

// Service to delete a specific partner
const deleteSpecificPartner = async (id) => {
  return await Partner.deleteOne({ _id: id });
};

module.exports = {
  createPartner,
  getAllPartners,
  getSpecificPartner,
  updateSpecificPartner,
  deleteSpecificPartner,
};
