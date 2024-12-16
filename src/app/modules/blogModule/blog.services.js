const Blog = require('./blog.model');

// Service to create a new blog post
const createBlog = async (data) => {
  return await Blog.create(data);
};

// Service to get all blog posts
const getAllBlogs = async () => {
  return await Blog.find().sort('-createdAt');
};

// Service to get a specific blog post by ID
const getSpecificBlog = async (id) => {
  return await Blog.findOne({ _id: id });
};

// Service to update a specific blog post
const updateSpecificBlog = async (id, data) => {
  return await Blog.updateOne({ _id: id }, data, {
    runValidators: true,
  });
};

// Service to delete a specific blog post
const deleteSpecificBlog = async (id) => {
  return await Blog.deleteOne({ _id: id });
};

module.exports = {
  createBlog,
  getAllBlogs,
  getSpecificBlog,
  updateSpecificBlog,
  deleteSpecificBlog,
};
