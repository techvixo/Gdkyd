const cloudinary = require('cloudinary').v2
const CustomError = require('../app/errors')

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const fileUploader = async (files, directory, imageName) => {
  if (!files || Object.keys(files).length === 0) {
    throw new CustomError.BadRequestError('No files were uploaded!')
  }

  const uploadToCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: `uploads/${directory}` }, (error, result) => {
          if (error) {
            console.error('Cloudinary Upload Error:', error)
            reject(new CustomError.BadRequestError(error.message))
          } else {
            resolve(result.secure_url)
          }
        })
        .end(file.data) // ✅ Convert buffer to stream
    })
  }

  if (!Array.isArray(files[imageName])) {
    return await uploadToCloudinary(files[imageName])
  } else if (files[imageName].length > 0) {
    const uploadPromises = files[imageName].map((file) =>
      uploadToCloudinary(file)
    )
    return await Promise.all(uploadPromises)
  } else {
    throw new CustomError.BadRequestError('Invalid file format!')
  }
}

module.exports = fileUploader

// const CustomError = require("../app/errors")
// const fs = require('fs')
// const path = require('path')

// const fileUploader = async(files, directory, imageName) => {
//     // check the file
//     if (!files || Object.keys(files).length === 0) {
//         throw new CustomError.BadRequestError('No files were uploaded!')
//     }

//     const folderPath = path.join('uploads', directory);

//     // Ensure the directory exists, if not, create it
//     if (!fs.existsSync(folderPath)) {
//         fs.mkdirSync(folderPath, { recursive: true })
//     }

//      // check one image or two image
//      if (!Array.isArray(files[imageName])) {
//         const fileName = files[imageName].name
//         const filePath = path.join(folderPath, fileName)
//         await files[imageName].mv(filePath)

//         return filePath
//     } else if (files[imageName].length > 0) {
//         // Handle multiple file uploads
//         const filePaths = []
//         for (const item of files[imageName]) {
//             const fileName = item.name
//             const filePath = path.join(folderPath, fileName)
//             await item.mv(filePath)
//             filePaths.push(filePath) // Collect all file paths
//         }

//         return filePaths
//     } else {
//         throw new CustomError.BadRequestError('Invalid file format!')
//     }
// }

// module.exports = fileUploader
