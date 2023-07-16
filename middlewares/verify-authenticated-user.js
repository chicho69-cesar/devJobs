const { request, response } = require('express')

const verifyAuthenticatedUser = (req = request, res = response, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/sign-in')
  }

  return next()
}

module.exports = verifyAuthenticatedUser
