const { request, response } = require('express')
const { validationResult } = require('express-validator')

const Vacancy = require('../models/vacancy')

const newVacancy = (req = request, res = response) => {
  return res.render('new-vacancy', {
    pageName: 'Nueva Vacante',
    tagline: 'Llena el formulario y publica tu vacante',
    signOut: true,
    name: req.user.name,
    image: req.user.image,
  })
}

const addVacancy = async (req = request, res = response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.session.messages = {
      error: errors.array().map(error => error.msg)
    }

    console.log(req.body)
    console.log(errors)

    return res.render('new-vacancy', {
      pageName: 'Nueva Vacante',
      tagline: 'Llena el formulario y publica tu vacante',
      signOut: true,
      name: req.user.name,
      image: req.user.image,
    })
  }

  const {
    title,
    company,
    location,
    salary,
    contract,
    description,
    skills,
  } = req.body
  const { _id: author } = req.user

  const vacancy = new Vacancy({
    title,
    company,
    location,
    salary: +salary,
    contract,
    description,
    author,
  })

  vacancy.skills = skills.split(',')

  const newVacancy = await vacancy.save()

  return res.redirect(`/vacancies/${newVacancy.url}`)
}

const showVacancy = async (req = request, res = response) => {
  const { url } = req.params

  const vacancy = await Vacancy.findOne({ url })
    .populate('author', 'name image')

  if (!vacancy) {
    req.session.messages = {
      error: ['La vacante no existe']
    }

    return res.redirect('/')
  }

  return res.render('vacancy', {
    vacancy,
    pageName: vacancy.title,
    searchBar: true,
  })
}

const editVacancyForm = async (req = request, res = response) => {
  const { url } = req.params

  const vacancy = await Vacancy.findOne({ url }).populate('author')
  if (!vacancy) {
    req.session.messages = {
      error: ['La vacante no existe']
    }

    return res.redirect('/')
  }

  return res.render('edit-vacancy', {
    vacancy,
    pageName: `Editar - ${vacancy.title}`,
    signOut: true,
    name: req.user.name,
    image: req.user.image,
  })
}

const editVacancy = async (req = request, res = response) => {
  const vacancyUpdated = req.body
  vacancyUpdated.salary = +vacancyUpdated.salary
  vacancyUpdated.skills = vacancyUpdated.skills.split(',')

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('edit-vacancy', {
      vacancy: vacancyUpdated,
      errors: errors.array(),
      pageName: 'Editar',
      signOut: true,
      name: req.user.name,
      image: req.user.image,
    })
  }

  const { url } = req.params

  const vacancy = await Vacancy.findOneAndUpdate({ url }, vacancyUpdated, {
    new: true,
    runValidators: true
  })

  return res.redirect(`/vacancies/${vacancy.url}`)
}

const deleteVacancy = async (req = request, res = response) => {
  const { id } = req.params
  const vacancy = await Vacancy.findById(id)

  if (!vacancy) {
    req.session.messages = {
      error: ['La vacante no existe'],
    }

    return res.redirect('/')
  }

  if (vacancy.author.toString() === req.user._id.toString()) {
    await Vacancy.deleteOne({ _id: id })

    req.session.messages = {
      success: ['La vacante ha sido eliminada con éxito']
    }

    res.status(200).send('Vacante Eliminada Correctamente')
  } else {
    res.status(403).send('Error')
  }
}

const contact = async (req = request, res = response) => {
  const { url } = req.params

  const vacancy = await Vacancy.findOne({ url })
  if (!vacancy) {
    req.session.messages = {
      error: ['La vacante no existe'],
    }

    return res.redirect('/')
  }

  const { name, email } = req.body

  const newCandidate = {
    name,
    email,
    cv: req.file.filename,
  }

  vacancy.candidates.push(newCandidate)
  await vacancy.save()

  req.session.messages = {
    success: ['Se envió tu Curriculum Correctamente']
  }

  return res.redirect('/')
}

const showCandidates = async (req = request, res = response) => {
  const { id } = req.params

  const vacancy = await Vacancy.findById(id)

  if (!vacancy) {
    req.session.messages = {
      error: ['La vacante no existe'],
    }

    return res.redirect('/')
  }

  if (vacancy.author.toString() !== req.user._id.toString()) {
    return res.redirect('/')
  }

  return res.render('candidates', {
    pageName: `Candidatos Vacante - ${vacancy.title}`,
    signOut: true,
    name: req.user.name,
    image: req.user.image,
    candidates: vacancy.candidates,
  })
}

const searchVacancies = async (req = request, res = response) => {
  const { q: query } = req.body

  const vacancies = await Vacancy.find({
    $text: { $search: query },
  })

  const messages = req.session.messages || {}
  delete req.session.messages

  return res.render('home', {
    pageName: `Resultados de la búsqueda: ${query}`,
    searchBar: true,
    vacancies,
    messages,
  })
}

module.exports = {
  newVacancy,
  addVacancy,
  showVacancy,
  editVacancyForm,
  editVacancy,
  deleteVacancy,
  contact,
  showCandidates,
  searchVacancies
}
