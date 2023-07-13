require('colors')
const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('Database is connected'.green)
  } catch (error) {
    console.log(`${error}`.red)
    throw new Error('Error starting the database')
  }
}

module.exports = {
  dbConnection
}
