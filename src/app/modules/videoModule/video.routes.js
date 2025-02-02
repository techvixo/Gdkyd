const express = require('express')
const videoControllers = require('./video.controllers')

const videoRouter = express.Router()

videoRouter.post('/add', videoControllers.createVideo)
videoRouter.get('/all', videoControllers.getAllVideos)
videoRouter.delete('/delete/:id', videoControllers.deleteSpecificVideo)

module.exports = videoRouter
