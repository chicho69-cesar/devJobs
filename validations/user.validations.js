const { body } = require('express-validator')

const validationName = () =>
  body('name')
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres')

const validationEmail = () => 
  body('email')
    .isEmail().withMessage('El correo no es valido')

const validationPassword = () => 
  body('password')
    .notEmpty().withMessage('La contraseña es requerida')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener mínimo 6 caracteres')

const validationConfirmPassword = () =>
  body('confirm')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Las contraseñas no coinciden')
      }
      return true
    })

module.exports = {
  validationName,
  validationEmail,
  validationPassword,
  validationConfirmPassword
}
