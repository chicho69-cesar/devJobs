const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'The email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'The name is required'],
  },
  password: {
    type: String,
    required: [true, 'The password is required'],
    trim: true,
  },
  token: String,
  expiration: Date,
  image: String,
})

// Methods to hash the password
userSchema.pre('save', async function (next) {
  // If the password is already hashed
  if (!this.isModified('password')) {
    return next() // Continue with the next middleware
  }

  // If the password is not hashed
  const hash = await bcrypt.hash(this.password, 12)
  this.password = hash
  
  next()
})

userSchema.post('save', async function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000 ) {
    next('This email is already in use')
  } else {
    next(error)
  }
})

// Authenticate users
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject()
  user.uid = _id

  return user
}

module.exports = model('User', userSchema)
