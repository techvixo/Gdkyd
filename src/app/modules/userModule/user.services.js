const User = require("./user.model")

// service for create new user
const createUser = async(data) => {
    return await User.create(data);
}

// service for get all user
const getAllUser = async() => {
    return await User.find().select("-password")
}

// service for get specific user
const getSpecificUser = async(id) => {
    return await User.findOne({_id: id}).select("-password")
}

// service for update specific user
const updateSpecificUser = async(id, data) => {
    return await User.updateOne({_id: id}, data, {
        runValidators: true
    })
}

// service for delete specific user
const deleteSpecificUser = async(id) => {
    return await User.deleteOne({_id: id})
}


module.exports = {
    createUser,
    getAllUser,
    getSpecificUser,
    updateSpecificUser,
    deleteSpecificUser,
}