const express = require('express');
const productControllers = require('./product.controllers');
const requestValidator = require('../../middlewares/requestValidator');
const ProductValidationZodSchema = require('./product.validation');
// const authorization = require('../../middlewares/authorization');

const productRouter = express.Router();

productRouter.post(
    '/create',
    // authorization('admin'),
    // requestValidator(ProductValidationZodSchema.createProductZodSchema),
    productControllers.createProduct
  )
  productRouter.get('/all', productControllers.getAllProducts)
  productRouter.get(
    '/:id',
    requestValidator(ProductValidationZodSchema.specificProductZodSchema),
    productControllers.getSpecificProduct
  )
  productRouter.patch(
    '/update/:id',
    // authorization('admin'),
    requestValidator(ProductValidationZodSchema.specificProductZodSchema),
    productControllers.updateSpecificProduct
  )
  productRouter.delete(
    '/delete/:id',
    // authorization('admin'),
    requestValidator(ProductValidationZodSchema.specificProductZodSchema),
    productControllers.deleteSpecificProduct
  )

  // retrive related product
  productRouter.post('/retrive/related-product', productControllers.getRelatedProduct)

  productRouter.get('/retrieve/for-sitemap', productControllers.getProductsForSitemap)

module.exports = productRouter