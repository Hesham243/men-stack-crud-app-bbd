const express = require('express')
const router = express.Router()
const Business = require('../models/business')
// everything in this file has /businesses front

router.get('/', async (req, res) => {
  const allBusinesses = await Business.find()
  res.render('businesses/index.ejs', {allBusinesses: allBusinesses})
})


router.get('/new', (req, res) => {
  res.render('businesses/new.ejs')
})


router.post('/', async (req, res) => {
  if (req.body.isVerified === 'on'){
    req.body.isVerified = true
  }else {
    req.body.isVerified = false
  }
  await Business.create(req.body)
  res.redirect('/businesses/')
})


router.get('/:businessId', async (req, res) => {
  const foundBusiness = await Business.findById(req.params.businessId)
  res.render('businesses/show.ejs', {foundBusiness: foundBusiness})
})

module.exports = router