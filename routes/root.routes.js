const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.render('home', {
    pageName: 'Home',
  })
})

router.get('*', (req, res) => {
  res.render('error404', {
    pageName: '404 Not Found',
  })
})

module.exports = router
