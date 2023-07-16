const { request, response } = require('express')
const multer = require('multer')

const { uploadImage } = require('../helpers/multer')

const uploadProfileImage = (req = request, res = response, next) => {
  uploadImage(req, res, function (error) {
    if (error) {
      const message = error instanceof multer.MulterError
        ? error.code === 'LIMIT_FILE_SIZE'
          ? 'El archivo es muy grande: Máximo 1MB'
          : error.message
        : error.message

      req.session.messages = {
        error: [message]
      }

      return res.redirect('/administration')
    } else {
      return next()
    }
  })
}

module.exports = {
  uploadProfileImage
}
