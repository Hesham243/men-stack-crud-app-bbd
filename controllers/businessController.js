const express = require('express')
const router = express.Router()
const Business = require('../models/business')


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


router.delete('/:businessId', async (req, res) => {
  await Business.findByIdAndDelete(req.params.businessId)
  res.redirect('/businesses')
})


router.get('/:businessId/edit', async (req, res) => {
  const foundBusiness = await Business.findById(req.params.businessId)
  res.render('businesses/edit.ejs', {foundBusiness: foundBusiness})
})


router.put('/:businessId', async (req, res) => {
  if (req.body.isVerified === 'on'){
    req.body.isVerified = true
  }else {
    req.body.isVerified = false
  }

  await Business.findByIdAndUpdate(req.params.businessId, req.body)
  res.redirect(`/businesses/${req.params.businessId}`)
})

module.exports = router