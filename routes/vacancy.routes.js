const { Router } = require('express')

const verifyAuthenticatedUser = require('../middlewares/verify-authenticated-user')
const { uploadCv } = require('../middlewares/upload-cv')
const {
  newVacancy,
  addVacancy,
  showVacancy,
  editVacancyForm,
  editVacancy,
  deleteVacancy,
  contact,
  showCandidates,
  searchVacancies,
} = require('../controllers/vacancies.controller')
const {
  validationCompany,
  validationContract,
  validationLocation,
  validationSkills,
  validationTitle,
} = require('../validations/vacancy.validations')

const router = Router()

router.get('/new', [
  verifyAuthenticatedUser,
], newVacancy)

router.post('/new', [
  verifyAuthenticatedUser,
  validationCompany(),
  validationContract(),
  validationLocation(),
  validationSkills(),
  validationTitle(),
], addVacancy)

router.get('/:url', showVacancy)

router.get('/edit/:url', [
  verifyAuthenticatedUser,
], editVacancyForm)

router.post('/edit/:url', [
  verifyAuthenticatedUser,
  validationCompany(),
  validationContract(),
  validationLocation(),
  validationSkills(),
  validationTitle(),
], editVacancy)

router.delete('/delete/:id', [
  verifyAuthenticatedUser,
], deleteVacancy)

router.post('/:url', [
  uploadCv,
], contact)

router.get('/candidates/:id', [
  verifyAuthenticatedUser,
], showCandidates)

router.post('/search/query', searchVacancies)

module.exports = router
