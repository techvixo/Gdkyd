const heroServices = require('./hero.services');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors/index');
const sendResponse = require('../../../shared/sendResponse');
const fileUploader = require('../../../utils/fileUploader');

// Controller for creating a new hero
const createHero = async (req, res) => {
  const heroData = req.body;

  // Upload images if provided
  if (req.files) {
    const heroImage = await fileUploader(
      req.files,
      `hero-image-${heroData.title_en}`,
      'image'
    );
    heroData.image = heroImage;
  }

  const hero = await heroServices.createHero(heroData);
  if(!hero){
    throw new CustomError.BadRequestError("Failed to create hero!")
  }

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'Hero creation successful',
    data: hero,
  });
};

// Controller for update a hero
const updateHero = async (req, res) => {
  const {id} = req.params
  const heroData = req.body;

  // Upload images if provided
  if (req.files) {
    const heroImage = await fileUploader(
      req.files,
      `hero-image-${heroData.title_en}`,
      'image'
    );
    heroData.image = heroImage;
  }

  const updatedHero = await heroServices.updateHero(id, heroData);
  if(!updatedHero.modifiedCount){
    throw new CustomError.BadRequestError("Failed to update hero!")
  }

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'Hero update successful',
  });
};

// Controller for getting all heroes
const getAllHeroes = async (req, res) => {
  const heroes = await heroServices.getAllHeroes();
  // console.log(req.ip)
  const firstHero = heroes[0]
  firstHero.visitCount = firstHero.visitCount + 1 || 0 + 1
  await firstHero.save()
  // console.log(firstHero)

  // if(heroes.length === 0){
  //   throw new CustomError.BadRequestError("No heroes found!")
  // }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Heroes retrieved successfully',
    data: heroes,
  });
};

// Controller for deleting a specific hero
const deleteSpecificHero = async (req, res) => {
  const { id } = req.params;

  const result = await heroServices.deleteHero(id);
  if (!result.deletedCount) {
    throw new CustomError.NotFoundError('Hero deletion failed!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Hero deleted successfully',
  });
};

module.exports = {
  createHero,
  updateHero,
  getAllHeroes,
  deleteSpecificHero,
};
