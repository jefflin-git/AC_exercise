//引用Express與Express路由器
const express = require('express')
const router = express.Router()
//引入restaurant model
const RestList = require('../../models/restaurant.js')

//搜尋
router.get('/', (req, res) => {
  const keyword = req.query.keyword.trim()
  if (keyword.length === 0) {
    return res.redirect('/')
  }
  RestList.find()
    .lean()
    .then(restaurant => {
      const searchRestaurant = restaurant.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
      res.render('index', { restaurant: searchRestaurant, keyword: keyword })
    })
    .catch(error => console.log(error))

})

//匯出路由器
module.exports = router