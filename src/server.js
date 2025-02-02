const mongoose = require('mongoose')
const config = require('./config')
const app = require('./app')
const port = 8002

const dbConnection = async () => {
  mongoose.connect(config.database_url)
  console.log('database connection successfull')
  app.listen(port || config.server_port, () => {
    console.log('server is listing on port', port || config.server_port)
  })
}

dbConnection()
