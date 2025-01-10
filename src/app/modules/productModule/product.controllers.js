const productServices = require('./product.services')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../../errors')
const sendResponse = require('../../../shared/sendResponse')
const fileUploader = require('../../../utils/fileUploader')
const IdGenerator = require('../../../utils/idGenerator')
const { getSpecificCategory } = require('../categoryModule/category.services')
const Category = require('../categoryModule/category.model')

// Controller for creating a new product
const createProduct = async (req, res) => {
  const productData = req.body
  const productId = IdGenerator.generateId()

  if (productData.category && typeof productData.category === 'string') {
    productData.category = JSON.parse(productData.category)
  }

  productData.productId = productId

  const configurations =
    typeof req.body.configurations === 'string'
      ? JSON.parse(req.body.configurations)
      : req.body.configurations

  productData.configurations = configurations
  productData.category = {
    categoryId: productData.categoryId,
    title_en: productData.category_title_en,
    title_cn: productData.category_title_cn
  }

  productData.createdBy = {
    adminId: productData.adminId,
    name_en: productData.admin_name_en,
    name_cn: productData.admin_name_cn,
    email: productData.admin_email
  }
  // Upload images if any
  const productImages = await fileUploader(
    req.files,
    `product-image-${productData.title}`,
    'images'
  )
  productData.images = productImages

  const product = await productServices.createProduct(productData)
  if (!product) {
    throw new CustomError.BadRequestError('Failed to create new product!')
  }
// console.log(product)
  const category = await getSpecificCategory(product.category.categoryId)
  if(!category){
    throw new CustomError.BadRequestError("No category found!")
  }
  category.products.push(product._id)
  await category.save()

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'Product creation successful',
    data: product
  })
}

// Controller for getting all products
const getAllProducts = async (req, res) => {
  const products = await productServices.getAllProducts()
  // if (products.length === 0) {
  //   throw new CustomError.NotFoundError('No products found!')
  // }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Products retrieved successfully',
    data: products
  })
}

// Controller for getting a specific product by ID
const getSpecificProduct = async (req, res) => {
  const { id } = req.params

  const product = await productServices.getSpecificProduct(id)
  if (!product) {
    throw new CustomError.NotFoundError('Product not found!')
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Product retrieved successfully',
    data: product
  })
}

// Controller for updating a specific product
const updateSpecificProduct = async (req, res) => {
  const { id } = req.params
  const updateData = req.body

  if(updateData.category){
    const category = await Category.findOne({_id: updateData.category})
    updateData.category = {
      categoryId: updateData.category,
      title_en: category.name_en,
      title_cn: category.name_cn
    }
    console.log(updateData)
  }

  const configurations =
    typeof req.body.configurations === 'string'
      ? JSON.parse(req.body.configurations)
      : req.body.configurations

  updateData.configurations = configurations

  // If there are new images to upload
  if (req.files || req.files?.length > 0) {
    const productImages = await fileUploader(
      req.files,
      `product-image-${updateData.title}`,
      'images'
    )
    updateData.images = productImages
  }

  const product = await productServices.updateSpecificProduct(id, updateData)
  if (!product.modifiedCount) {
    throw new CustomError.NotFoundError('Product update failed!')
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Product updated successfully'
  })
}

// Controller for deleting a specific product
const deleteSpecificProduct = async (req, res) => {
  const { id } = req.params

  const result = await productServices.deleteSpecificProduct(id)
  if (!result.deletedCount) {
    throw new CustomError.NotFoundError('Product deletion failed!')
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Product deleted successfully'
  })
}

// controller for get related product 
const getRelatedProduct = async(req, res) => {
  const {categoryId, targetProductId} = req.body;
  
  const category = await getSpecificCategory(categoryId);
  const relatedProducts = category.products.filter(product => product._id.toString() !== targetProductId)
  
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Related product retrive successfull',
    data: relatedProducts
  })
}

module.exports = {
  createProduct,
  getAllProducts,
  getSpecificProduct,
  updateSpecificProduct,
  deleteSpecificProduct,
  getRelatedProduct
}
