const sendResponse = (response, data) => {
    const responseData = {
        statusCode: data.statusCode,
        status: data.status,
        message: data.message || null,
        meta: data.meta || null || undefined,
        data: data.data || null || undefined,
    }

    response.status(data.statusCode).json(responseData)
}


module.exports = sendResponse;