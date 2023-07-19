const { request, response } = require('express')
const { validationResult } = require('express-validator')

const User = require('../models/user')

const signUpForm = async (req = request, res = response) => {
  return res.render('sign-up', {
    pageName: 'Crea tu cuenta en devJobs',
    tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta',
  })
}

const createUser = async (req = request, res = response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('sign-up', {
      errors: errors.array(),
      messages: {
        error: ['Error al crear el usuario']
      },
      pageName: 'Crea tu cuenta en devJobs',
      tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta'
    })
  }

  const { name, email, password } = req.body

  try {
    const user = new User({ name, email, password, image: '' })
    await user.save()

    req.session.messages = {
      success: ['Usuario creado con éxito']
    }

    return res.redirect('/sign-in')
  } catch (error) {
    console.log(error)

    req.session.messages = {
      error: ['Error al crear el usuario']
    }

    return res.redirect('/sign-up')
  }
}

const signInForm = (req = request, res = response) => {
  const messages = req.session.messages || {}
  delete req.session.messages

  return res.render('sign-in', {
    pageName: 'Inicia sesión en devJobs',
    messages,
  })
}

const editProfileForm = (req = request, res = response) => {
  return res.render('edit-profile', {
    pageName: 'Edita tu perfil en devJobs',
    signOut: true,
    name: req.user.name,
    email: req.user.email,
    image: req.user.image,
    errors: []
  })
}

const editProfile = async (req = request, res = response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('edit-profile', {
      errors: errors.array(),
      messages: {
        error: ['Error al actualizar la información del usuario']
      },
      pageName: 'Edita tu perfil en devJobs',
      user: req.user,
      signOut: true,
      name: req.user.name,
      image: req.user.image,
    })
  }

  const { name, email } = req.body
  const user = await User.findById(req.user._id)

  user.name = name
  user.email = email

  if (req.body.password) {
    user.password = req.body.password
  }

  if (req.file) {
    user.image = req.file.filename
  }

  await user.save()

  req.session.messages = {
    success: ['Usuario actualizado con éxito']
  }

  return res.redirect('/administration')
}

module.exports = {
  signUpForm,
  createUser,
  signInForm,
  editProfileForm,
  editProfile
}
