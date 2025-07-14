const express = require('express')
const router = express.Router()
const Business = require('../models/business')


router.get('/new', (req, res) => {
  res.render('businesses/new.ejs')
})


router.post('/', async (req, res) => {
  if (req.body.isVerified === 'on'){
    req.body.isVerified = true
  }else {
    req.body.isVerified = false
  }
  console.log(req.body)
  await Business.create(req.body)
  res.redirect('/businesses/new')
})

module.exports = router