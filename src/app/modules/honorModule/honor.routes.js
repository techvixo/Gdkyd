const express = require('express');
const partnerControllers = require('./honor.controllers');
const requestValidator = require('../../middlewares/requestValidator');
const PartnerValidationZodSchema = require('./honor.validation');
// const authorization = require('../../middlewares/authorization');

const honorRouter = express.Router();

honorRouter.post(
    '/create',
    // authorization('admin'),
    requestValidator(PartnerValidationZodSchema.createPartnerZodSchema),
    partnerControllers.createPartner
  )
  honorRouter.get('/all', partnerControllers.getAllPartners)
  honorRouter.get(
    '/:id',
    requestValidator(PartnerValidationZodSchema.specificPartnerZodSchema),
    partnerControllers.getSpecificPartner
  )
  honorRouter.patch(
    '/update/:id',
    // authorization('admin'),
    requestValidator(PartnerValidationZodSchema.specificPartnerZodSchema),
    partnerControllers.updateSpecificPartner
  )
  honorRouter.delete(
    '/delete/:id',
    // authorization('admin'),
    requestValidator(PartnerValidationZodSchema.specificPartnerZodSchema),
    partnerControllers.deleteSpecificPartner
  )

module.exports = honorRouter;