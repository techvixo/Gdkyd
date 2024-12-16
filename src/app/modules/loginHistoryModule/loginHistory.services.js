const LoginHistory = require("./loginHistory.model")

// service for create login history
const createLoginHistory = async(data) => {
    return await LoginHistory.create(data)
}

module.exports = {
    createLoginHistory
}