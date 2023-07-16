const { Router } = require('express')

const { 
  signUpForm,
  createUser,
  signInForm,
  editProfileForm,
  editProfile,
} = require('../controllers/users.controller')
const {
  authenticateUser,
  signOut,
  resetPasswordForm,
  sendToken,
  resetPassword,
  savePassword,
  showPanel,
} = require('../controllers/auth.controller')
const {
  validationName,
  validationEmail,
  validationPassword,
  validationConfirmPassword,
} = require('../validations/user.validations')
const verifyAuthenticatedUser = require('../middlewares/verify-authenticated-user')
const { uploadProfileImage } = require('../middlewares/upload-profile-image')

const router = Router()

router.get('/sign-up', signUpForm)

router.post('/sign-up', [
  validationName(),
  validationEmail(),
  validationPassword(),
  validationConfirmPassword(),
], createUser)

router.get('/sign-in', signInForm)

router.post('/sign-in', authenticateUser)

router.get('/sign-out', [
  verifyAuthenticatedUser,
], signOut)

router.get('/reset-password', resetPasswordForm)
router.post('/reset-password', sendToken)

router.get('/reset-password/:token', resetPassword)
router.post('/reset-password/:token', savePassword)

router.get('/administration', [
  verifyAuthenticatedUser,
], showPanel)

router.get('/edit-profile', [
  verifyAuthenticatedUser,
], editProfileForm)

router.post('/edit-profile', [
  verifyAuthenticatedUser,
  /* validationName(),
  validationEmail(), */
  uploadProfileImage,
], editProfile)

module.exports = router
