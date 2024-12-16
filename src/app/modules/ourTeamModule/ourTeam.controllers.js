const ourTeamServices = require('./ourTeam.services');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const sendResponse = require('../../../shared/sendResponse');
const fileUploader = require('../../../utils/fileUploader');

// Controller for creating a new team member
const createTeamMember = async (req, res) => {
  const teamMemberData = req.body;
  console.log(teamMemberData)

  // Upload image if present
  if (req.files || req.files?.length > 0) {
    const imagePath = await fileUploader(req.files, `team-image-${teamMemberData.name_en}`, 'image');
    teamMemberData.image = imagePath;
  }

  const teamMember = await ourTeamServices.createTeamMember(teamMemberData);
  if (!teamMember) {
    throw new CustomError.BadRequestError('Failed to create new team member!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'Team member creation successful',
    data: teamMember,
  });
};

// Controller for getting all team members
const getAllTeamMembers = async (req, res) => {
  const teamMembers = await ourTeamServices.getAllTeamMembers();
  // if (teamMembers.length === 0) {
  //   throw new CustomError.NotFoundError('No team members found!');
  // }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Team members retrieved successfully',
    data: teamMembers,
  });
};

// Controller for getting a specific team member by ID
const getSpecificTeamMember = async (req, res) => {
  const { id } = req.params;

  const teamMember = await ourTeamServices.getSpecificTeamMember(id);
  if (!teamMember) {
    throw new CustomError.NotFoundError('Team member not found!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Team member retrieved successfully',
    data: teamMember,
  });
};

// Controller for updating a specific team member
const updateSpecificTeamMember = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // If there's a new image to upload
  if (req.files || req.files?.length > 0) {
    const imagePath = await fileUploader(req.files, `team-image-${updateData.name_en}`, 'image');
    updateData.image = imagePath;
  }

  const teamMember = await ourTeamServices.updateSpecificTeamMember(id, updateData);
  if (!teamMember.modifiedCount) {
    throw new CustomError.NotFoundError('Team member update failed!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Team member updated successfully',
  });
};

// Controller for deleting a specific team member
const deleteSpecificTeamMember = async (req, res) => {
  const { id } = req.params;

  const result = await ourTeamServices.deleteSpecificTeamMember(id);
  if (!result.deletedCount) {
    throw new CustomError.NotFoundError('Team member deletion failed!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Team member deleted successfully',
  });
};

module.exports = {
  createTeamMember,
  getAllTeamMembers,
  getSpecificTeamMember,
  updateSpecificTeamMember,
  deleteSpecificTeamMember,
};
