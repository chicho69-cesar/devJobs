const express = require('express')
const { create } = require('express-handlebars')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const { dbConnection } = require('./config/db')
const { rootRoutes } = require('./routes')
const handlebarsHelpers = require('./helpers/handlebars')
// TODO: require passport configuration

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000
    this.hbs = create({ 
      extname: 'hbs',
      helpers: handlebarsHelpers,
      layoutsDir: './views/layouts',
      partialsDir: './views/partials',
      defaultLayout: 'main'
    })

    this.paths = {
      root: '/'
    }

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
    await dbConnection()
  }

  middlewares() {
    // Enable body parser
    this.app.use(bodyParser.json())
    // URL encoded for POST requests with form data
    this.app.use(express.urlencoded({ extended: true }))
    // JSON parser for API requests
    this.app.use(express.json())
    // Enable the use of the public folder
    this.app.use(express.static('public'))
    // Cookies by cookie parser
    this.app.use(cookieParser())
    // Session
    this.app.use(session({
      secret: process.env.SECRET,
      key: process.env.KEY,
      resave: false,
      saveUninitialized: false,
      // store: new MongoStore({ mongooseConnection : mongoose.connection })
      store: MongoStore.create({
        mongoUrl: process.env.DATABASE,
      })
    }))
    // TODO: Initialize passport
  }

  routes() {
    this.app.use(this.paths.root, rootRoutes)
  }

  config() {
    this.app.engine('hbs', this.hbs.engine)
    this.app.set('view engine', 'hbs')
    this.app.set('views', './views')
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port: ${this.port}`)
    })
  }
}

module.exports = Server
