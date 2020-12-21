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


//瀏覽餐廳清單
router.get('/', (req, res) => {
  RestList.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})
//瀏覽餐廳細節
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  RestList.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})


//修改頁面路由
router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  RestList.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
//修改功能路由
router.put('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  const editRestaurant = req.body
  RestList.findById(id)
    .then(restaurant => {
      restaurant = Object.assign(restaurant, editRestaurant)
      restaurant.save()
      console.log(restaurant)
    })
    .then(restaurant => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})
//刪除功能路由
router.delete('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  RestList.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//匯出路由器
module.exports = router