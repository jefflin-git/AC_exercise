//引用Express與Express路由器
const express = require('express')
const router = express.Router()
//引入restaurant model
const RestList = require('../../models/restaurant.js')

//新增餐廳頁面
router.get('/', (req, res) => res.render('new'))
//新增餐廳功能路由
router.post('/', (req, res) => {
  const addRestaurant = req.body
  RestList.create(addRestaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//匯出路由器
module.exports = router