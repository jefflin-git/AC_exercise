//引用Express與Express路由器
const express = require('express')
const router = express.Router()
//引入restaurant model
const RestList = require('../../models/restaurant.js')
const handlebars = require('handlebars')

// register helper
handlebars.registerHelper('ifEquals', function (job, targetJob, options) {
  if (job === targetJob) {
    return options.fn(this)
  }
  return options.inverse(this)
})

router.get('/', (req, res) => {
  const sort = req.query.sort
  let select = {}
  switch (sort) {
    case 'name_asc':
      select = { name_en: 'asc' }
      break
    case 'name_desc':
      select = { name_en: 'desc' }
      break
    case 'category':
      select = { category: 'asc' }
      break
    case 'location':
      select = { location: 'asc' }
      break
  }
  RestList.find()
    .lean()
    .sort(select)
    .then(restaurant => res.render('index', { restaurant, sort }))
    .catch(error => console.log(error))
})


//匯出路由器
module.exports = router