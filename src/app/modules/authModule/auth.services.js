const User = require("../userModule/user.model")

// service for get user by email
const getUserByEmail = async(email) => {
    return await User.findOne({email});
}


module.exports = {
    getUserByEmail
};