const { request, response } = require('express')

const Vacancy = require('../models/vacancy')

const showWorks = async (req = request, res = response) => {
  const vacancies = await Vacancy.find()

  const messages = req.session.messages || {} // Si no hay mensajes, inicializa como un objeto vacío
  delete req.session.messages // Elimina los mensajes después de mostrarlos para que no se muestren nuevamente en futuras solicitudes

  return res.render('home', {
    pageName: 'Trabajos',
    tagline: 'Encuentra y Pública Trabajos para Desarrolladores Web',
    searchBar: true,
    button: true,
    vacancies,
    messages,
  })
}

const customError404 = (req = request, res = response) => {
  return res.render('error404', {
    pageName: '404 Not Found',
  })
}

module.exports = {
  showWorks,
  customError404
}
