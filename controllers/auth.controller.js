const { request, response } = require('express')
const passport = require('passport')
const { v4: uuidv4 } = require('uuid')

const User = require('../models/user')
const Vacancy = require('../models/vacancy')
const { sendMail } = require('../helpers/emails')

const authenticateUser = passport.authenticate('local', {
  successRedirect: '/administration',
  failureRedirect: '/sign-in',
  failureFlash: true,
  badRequestMessage: 'Invalid email or password'
})

const showPanel = async (req = request, res = response) => {
  const vacancies = await Vacancy.find({ author: req.user._id })

  const messages = req.session.messages || {}
  delete req.session.messages

  console.log(vacancies)

  res.render('administration', {
    pageName: 'Panel de Administración',
    tagline: 'Crea y Administra tus vacantes desde aquí',
    signOut: true,
    name: req.user.name,
    image: req.user.image,
    vacancies,
    messages,
  })
}

const signOut = async (req = request, res = response) => {
  req.logout(function (err) {
    if (err) {
      console.error(err)
      return res.render('error')
    }

    req.session.messages = {
      success: ['Sesión cerrada correctamente']
    }

    res.redirect('/sign-in')
  })
}

const resetPasswordForm = async (req = request, res = response) => {
  const messages = req.session.messages || {}
  delete req.session.messages

  return res.render('reset-password', {
    pageName: 'Restablecer contraseña',
    tagline: 'Si ya tienes una cuenta pero olvidaste tu password, coloca tu email',
    messages,
  })
}

const sendToken = async (req = request, res = response) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    req.session.messages = {
      error: ['El usuario no existe']
    }

    return res.redirect('/sign-in')
  }

  user.token = uuidv4()
  user.expiration = Date.now() + 3600000

  await user.save()
  
  const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${user.token}`
  await sendMail({
    user,
    subject: 'Restablecer Password',
    resetUrl,
    template: 'reset'
  })

  req.session.messages = {
    success: ['Se envió un correo. Revisa tu email para las indicaciones']
  }

  return res.redirect('/sign-in')
}

const resetPassword = async (req = request, res = response) => {
  const { token } = req.params
  
  const user = await User.findOne({ token })
  if (!user) {
    req.session.messages = {
      error: ['El formulario ya no es valido, intenta de nuevo']
    }

    return res.redirect('/reset-password')
  }

  return res.render('new-password', {
    pageName: 'Nueva contraseña',
  })
}

const savePassword = async (req = request, res = response) => {
  const { token } = req.params

  const user = await User.findOne({ token })
  if (!user) {
    req.session.messages = {
      error: ['El formulario ya no es valido, intenta de nuevo']
    }

    return res.redirect('/reset-password')
  }

  user.password = req.body.password
  user.token = undefined
  user.expiration = undefined

  await user.save()

  req.session.messages = {
    success: ['Password Modificado Correctamente']
  }

  return res.redirect('/sign-in')
}

module.exports = {
  authenticateUser,
  showPanel,
  signOut,
  resetPasswordForm,
  sendToken,
  resetPassword,
  savePassword,
}
