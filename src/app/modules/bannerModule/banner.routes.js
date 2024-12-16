const express = require('express');
const bannerControllers = require('./banner.controllers');
const requestValidator = require('../../middlewares/requestValidator');
const BannerValidationZodSchema = require('./banner.validation');
// const authorization = require('../../middlewares/authorization');

const bannerRouter = express.Router();

bannerRouter.post(
    '/create',
    // authorization('admin'),
    requestValidator(BannerValidationZodSchema.createBannerZodSchema),
    bannerControllers.createBanner
  )
  bannerRouter.get('/all', bannerControllers.getAllBanners)
  bannerRouter.get(
    '/:id',
    requestValidator(BannerValidationZodSchema.specificBannerZodSchema),
    bannerControllers.getSpecificBanner
  )
  bannerRouter.patch(
    '/update/:id',
    // authorization('admin'),
    requestValidator(BannerValidationZodSchema.specificBannerZodSchema),
    bannerControllers.updateSpecificBanner
  )
  bannerRouter.delete(
    '/delete/:id',
    // authorization('admin'),
    requestValidator(BannerValidationZodSchema.specificBannerZodSchema),
    bannerControllers.deleteSpecificBanner
  )

module.exports = bannerRouter