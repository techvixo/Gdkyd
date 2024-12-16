const express = require('express');
const partnerControllers = require('./partner.controllers');
const requestValidator = require('../../middlewares/requestValidator');
const PartnerValidationZodSchema = require('./partner.validation');
// const authorization = require('../../middlewares/authorization');

const partnerRouter = express.Router();

partnerRouter.post(
    '/create',
    // authorization('admin'),
    requestValidator(PartnerValidationZodSchema.createPartnerZodSchema),
    partnerControllers.createPartner
  )
  partnerRouter.get('/all', partnerControllers.getAllPartners)
  partnerRouter.get(
    '/:id',
    requestValidator(PartnerValidationZodSchema.specificPartnerZodSchema),
    partnerControllers.getSpecificPartner
  )
  partnerRouter.patch(
    '/update/:id',
    // authorization('admin'),
    requestValidator(PartnerValidationZodSchema.specificPartnerZodSchema),
    partnerControllers.updateSpecificPartner
  )
  partnerRouter.delete(
    '/delete/:id',
    // authorization('admin'),
    requestValidator(PartnerValidationZodSchema.specificPartnerZodSchema),
    partnerControllers.deleteSpecificPartner
  )

module.exports = partnerRouter;