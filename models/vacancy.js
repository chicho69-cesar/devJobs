const { Schema, model } = require('mongoose')
const slug = require('slug')
const { nanoid } = require('nanoid')

const vacancySchema = new Schema({
  title: {
    type: String,
    required: [true, 'The title is required'],
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'The location is required'],
    trim: true,
  },
  salary: {
    type: Number,
    default: 0,
  },
  contract: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    lowercase: true,
  },
  skills: [String],
  candidates: [{
    name: String,
    email: String,
    cv: String,
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'The author is required'],
  }
})

// Create the url with a slug
vacancySchema.pre('save', function (next) {
  const url = slug(this.title)
  this.url = `${url}-${nanoid()}`

  next()
})

// Create an index
vacancySchema.index({ title: 'text' })

module.exports = model('Vacancy', vacancySchema)
