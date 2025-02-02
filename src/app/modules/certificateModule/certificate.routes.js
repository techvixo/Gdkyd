const express = require('express');
const certificateControllers = require('./certificate.controllers');
const requestValidator = require('../../middlewares/requestValidator');
const CertificateValidationZodSchema = require('./certificate.validation');
// const authorization = require('../../middlewares/authorization');

const certificateRouter = express.Router();

certificateRouter.post(
    '/create',
    // authorization('admin'),
    requestValidator(CertificateValidationZodSchema.createCertificateZodSchema),
    certificateControllers.createCertificate
  )
  certificateRouter.get('/all', certificateControllers.getAllCertificates)
  certificateRouter.get(
    '/:id',
    requestValidator(CertificateValidationZodSchema.specificCertificateZodSchema),
    certificateControllers.getSpecificCertificate
  )
  certificateRouter.patch(
    '/update/:id',
    // authorization('admin'),
    requestValidator(CertificateValidationZodSchema.specificCertificateZodSchema),
    certificateControllers.updateSpecificCertificate
  )
  certificateRouter.delete(
    '/delete/:id',
    // authorization('admin'),
    requestValidator(CertificateValidationZodSchema.specificCertificateZodSchema),
    certificateControllers.deleteSpecificCertificate
  )

module.exports = certificateRouter