const { StatusCodes } = require("http-status-codes")
const sendResponse = require("../../../shared/sendResponse")
const Blog = require("../blogModule/blog.model")
const { getAllBlogs } = require("../blogModule/blog.services")
const { getAllHeroes } = require("../heroModule/hero.services")
const { getAllPortfolios } = require("../portfolioModule/portfolio.services")
const Product = require("../productModule/product.model")
const { getAllProducts } = require("../productModule/product.services")
const { getSpecificUser } = require("../userModule/user.services")


const dashboard = async(req, res) => {
    const {id} = req.params
    const user = await getSpecificUser(id)
    const getHeros = await getAllHeroes()
    const totalVisitors = getHeros[0].visitCount || 0 + 1

    const products = await getAllProducts()
    const totalProduct = products.length

    const blog = await getAllBlogs()
    const totalBlog = blog.length

    const portfolio = await getAllPortfolios()
    const totalPortfolio = portfolio.length

    const recentProducts = await Product.find().sort('-createdAt').select('title_en images, status').limit(5)

    const recentBlog = await Blog.find().sort('-createdAt').select('_id, name_en').limit(5)
    
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        status: 'success',
        message: 'dashboard insights retrieved successfully',
        data: {
            user,
            totalVisitors,
            totalBlog,
            totalPortfolio,
            totalProduct,
            recentProducts,
            recentBlog
        }
      })
}

module.exports = {
    dashboard
}