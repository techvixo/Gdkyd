const express = require('express')
const categoryControllers = require('./category.controllers')
const requestValidator = require('../../middlewares/requestValidator')
const CategoryValidationZodSchema = require('./category.validation')
// const authorization = require('../../middlewares/authorization')

const categoryRouter = express.Router()

categoryRouter.post(
  '/create',
  // authorization('admin'),
  requestValidator(CategoryValidationZodSchema.createCategoryZodSchema),
  categoryControllers.createCategory
)
categoryRouter.get('/all', categoryControllers.getAllCategories)
categoryRouter.get(
  '/:id',
  requestValidator(CategoryValidationZodSchema.specificCategoryZodSchema),
  categoryControllers.getSpecificCategory
)
categoryRouter.patch(
  '/update/:id',
  // authorization('admin'),
  requestValidator(CategoryValidationZodSchema.specificCategoryZodSchema),
  categoryControllers.updateSpecificCategory
)
categoryRouter.delete(
  '/delete/:id',
  // authorization('admin'),
  requestValidator(CategoryValidationZodSchema.specificCategoryZodSchema),
  categoryControllers.deleteSpecificCategory
)

module.exports = categoryRouter
