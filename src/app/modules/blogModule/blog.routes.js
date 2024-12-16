const express = require('express');
const blogControllers = require('./blog.controllers');
const requestValidator = require('../../middlewares/requestValidator');
const BlogValidationZodSchema = require('./blog.validation');
// const authorization = require('../../middlewares/authorization');

const blogRouter = express.Router();

blogRouter.post(
    '/create',
    // authorization('admin'),
    requestValidator(BlogValidationZodSchema.createBlogZodSchema),
    blogControllers.createBlog
  )
  blogRouter.get('/all', blogControllers.getAllBlogs)
  blogRouter.get(
    '/:id',
    requestValidator(BlogValidationZodSchema.specificBlogZodSchema),
    blogControllers.getSpecificBlog
  )
  blogRouter.patch(
    '/update/:id',
    // authorization('admin'),
    requestValidator(BlogValidationZodSchema.specificBlogZodSchema),
    blogControllers.updateSpecificBlog
  )
  blogRouter.delete(
    '/delete/:id',
    // authorization('admin'),
    requestValidator(BlogValidationZodSchema.specificBlogZodSchema),
    blogControllers.deleteSpecificBlog
  )

module.exports = blogRouter