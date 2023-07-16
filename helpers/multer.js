const multer = require('multer')
const { nanoid } = require('nanoid')

const multerConfigurationImages = {
  limits: {
    fileSize: 1000000
  },
  storage: fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + '../../public/uploads/profiles')
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split('/')[1]
      cb(null, `${nanoid()}.${extension}`)
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true)
    } else {
      // cb(null, false)
      cb(new Error('Formato No Válido'))
    }
  }
}

const multerConfigurationPdfs = {
  limits: {
    fileSize: 1000000
  },
  storage: fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + '../../public/uploads/cv')
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split('/')[1]
      cb(null, `${nanoid()}.${extension}`)
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      // cb(null, false)
      cb(new Error('Formato No Válido'))
    }
  }
}

const uploadImage = multer(multerConfigurationImages).single('image')
const uploadPdf = multer(multerConfigurationPdfs).single('cv')

module.exports = {
  uploadImage,
  uploadPdf
}
