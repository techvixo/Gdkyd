const blogServices = require('./blog.services')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../../errors')
const sendResponse = require('../../../shared/sendResponse')
const fileUploader = require('../../../utils/fileUploader')

// Controller for creating a new blog post
const createBlog = async (req, res) => {
  const blogData = req.body
  console.log(blogData)
  // Upload heading image if present
  if (req.files || req.files.heading_image) {
    const headingImagePath = await fileUploader(
      req.files,
      `blog-heading-${blogData.name_en}`,
      'heading_image'
    )
    blogData.heading_image = headingImagePath
  }

  // Upload featured images if present
  // if (req.files || req.files.featured_images) {
  //   const featuredImagePaths = await fileUploader(req.files, `blog-featured-${blogData.name_en}`, 'featured_images')
  //   blogData.featured_images = featuredImagePaths;
  // }

  const blog = await blogServices.createBlog(blogData)
  if (!blog) {
    throw new CustomError.BadRequestError('Failed to create new blog post!')
  }

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'Blog post created successfully',
    data: blog
  })
}

// Controller for getting all blog posts
const getAllBlogs = async (req, res) => {
  const blogs = await blogServices.getAllBlogs()
  // if (blogs.length === 0) {
  //   throw new CustomError.NotFoundError('No blog posts found!')
  // }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Blog posts retrieved successfully',
    data: blogs
  })
}

// Controller for getting a specific blog post by ID
const getSpecificBlog = async (req, res) => {
  const { id } = req.params

  const blog = await blogServices.getSpecificBlog(id)
  if (!blog) {
    throw new CustomError.NotFoundError('Blog post not found!')
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Blog post retrieved successfully',
    data: blog
  })
}

// Controller for updating a specific blog post
const updateSpecificBlog = async (req, res) => {
  const { id } = req.params
  const updateData = req.body

  // Update heading image if present
  if (req.files || req.files?.heading_image) {
    const headingImagePath = await fileUploader(
      req.files,
      `blog-heading-${updateData.name_en}`,
      'heading_image'
    )
    updateData.heading_image = headingImagePath
  }

  // Update featured images if present
  // if (req.files || req.files.featured_images) {
  //   const featuredImagePaths = await fileUploader(req.files, `blog-featured-${updateData.name_en}`, 'featured_images')

  //   updateData.featured_images = featuredImagePaths;
  // }
  const getBlog = await blogServices.getSpecificBlog(id)
  if(!getBlog){
    throw new CustomError.BadRequestError("Invalid blog id!")
  }
  if (updateData.description_cn) {
    getBlog.description_cn.push(updateData.description_cn)
    await getBlog.save()
  } else if (updateData.description_en) {
    getBlog.description_en.push(updateData.description_en)
    await getBlog.save()
  } else {
    const blog = await blogServices.updateSpecificBlog(id, updateData)
    if (!blog.modifiedCount) {
      throw new CustomError.NotFoundError('Blog post update failed!')
    }
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Blog post updated successfully'
  })
}

// Controller for deleting a specific blog post
const deleteSpecificBlog = async (req, res) => {
  const { id } = req.params

  const result = await blogServices.deleteSpecificBlog(id)
  if (!result.deletedCount) {
    throw new CustomError.NotFoundError('Blog post deletion failed!')
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Blog post deleted successfully'
  })
}

module.exports = {
  createBlog,
  getAllBlogs,
  getSpecificBlog,
  updateSpecificBlog,
  deleteSpecificBlog
}
