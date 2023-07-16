const { body } = require('express-validator')

const validationTitle = () =>
  body('title')
    .notEmpty().withMessage('Agrega un Titulo a la Vacante')
    .isLength({ min: 3 }).withMessage('El titulo debe tener al meno 3 caracteres')

const validationCompany = () =>
  body('company')
    .notEmpty().withMessage('Agrega una Empresa')

const validationLocation = () =>
  body('location')
    .notEmpty().withMessage('Agrega una Ubicación')

const validationContract = () =>
  body('contract')
    .notEmpty().withMessage('Selecciona el Tipo de Contrato')

const validationSkills = () =>
  body('skills')
    .notEmpty().withMessage('Agrega al menos una habilidad')

module.exports = {
  validationTitle,
  validationCompany,
  validationLocation,
  validationContract,
  validationSkills
}
