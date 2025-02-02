const Certificate = require('./certificate.model');

// Service to create a new certificate
const createCertificate = async (data) => {
  return await Certificate.create(data);
};

// Service to get all certificates
const getAllCertificates = async () => {
  return await Certificate.find().sort('-createdAt');
};

// Service to get a specific certificate by ID
const getSpecificCertificate = async (id) => {
  return await Certificate.findOne({ _id: id });
};

// Service to update a specific certificate
const updateSpecificCertificate = async (id, data) => {
  return await Certificate.updateOne({ _id: id }, data, {
    runValidators: true,
  });
};

// Service to delete a specific certificate
const deleteSpecificCertificate = async (id) => {
  return await Certificate.deleteOne({ _id: id });
};

module.exports = {
  createCertificate,
  getAllCertificates,
  getSpecificCertificate,
  updateSpecificCertificate,
  deleteSpecificCertificate,
};
