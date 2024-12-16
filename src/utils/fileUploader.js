const CustomError = require("../app/errors")
const fs = require('fs')
const path = require('path')

const fileUploader = async(files, directory, imageName) => {
    // check the file
    if (!files || Object.keys(files).length === 0) {
        throw new CustomError.BadRequestError('No files were uploaded!')
    }

    const folderPath = path.join('uploads', directory);

    // Ensure the directory exists, if not, create it
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true })
    }


     // check one image or two image
     if (!Array.isArray(files[imageName])) {
        const fileName = files[imageName].name
        const filePath = path.join(folderPath, fileName)
        await files[imageName].mv(filePath)

        return filePath
    } else if (files[imageName].length > 0) {
        // Handle multiple file uploads
        const filePaths = []
        for (const item of files[imageName]) {
            const fileName = item.name
            const filePath = path.join(folderPath, fileName)
            await item.mv(filePath)
            filePaths.push(filePath) // Collect all file paths
        }

        return filePaths
    } else {
        throw new CustomError.BadRequestError('Invalid file format!')
    }
}

module.exports = fileUploader