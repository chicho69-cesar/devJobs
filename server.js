const express = require('express')
const cookieParser = require('cookie-parser')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000

    this.paths = {}

    // Database
    this.connectDB()
    // Middlewares
    this.middlewares()
    // Routes
    this.routes()
    // Config
    this.config()
  }

  async connectDB() {
    // 
  }

  middlewares() {
    // 
  }

  routes() {
    // 
  }

  config() {
    // 
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port: ${this.port}`)
    })
  }
}

module.exports = Server
