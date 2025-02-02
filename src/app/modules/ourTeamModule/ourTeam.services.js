const OurTeam = require('./ourTeam.model');

// Service to create a new team member
const createTeamMember = async (data) => {
  return await OurTeam.create(data);
};

// Service to get all team members
const getAllTeamMembers = async () => {
  return await OurTeam.find().sort('-createdAt');
};

// Service to get a specific team member by ID
const getSpecificTeamMember = async (id) => {
  return await OurTeam.findOne({ _id: id });
};

// Service to update a specific team member
const updateSpecificTeamMember = async (id, data) => {
  return await OurTeam.updateOne({ _id: id }, data, {
    runValidators: true,
  });
};

// Service to delete a specific team member
const deleteSpecificTeamMember = async (id) => {
  return await OurTeam.deleteOne({ _id: id });
};

module.exports = {
  createTeamMember,
  getAllTeamMembers,
  getSpecificTeamMember,
  updateSpecificTeamMember,
  deleteSpecificTeamMember,
};
