const { request, response } = require('express')
const multer = require('multer')

const { uploadPdf } = require('../helpers/multer')

const uploadCv = async (req = request, res = response, next) => {
  uploadPdf(req, res, async (error) => {
    if (error) {
      const message = error instanceof multer.MulterError
        ? error.code === 'LIMIT_FILE_SIZE'
          ? 'El archivo es muy grande: Máximo 1MB'
          : error.message
        : error.message

      req.session.messages = {
        error: [message]
      }

      return res.redirect('/') // back
    } else {
      return next()
    }
  })
}

module.exports = {
  uploadCv
}
