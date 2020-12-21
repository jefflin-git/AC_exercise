//引用Express與Express路由器
const express = require('express')
const router = express.Router()
//引入restaurant model
const RestList = require('../../models/restaurant.js')

//瀏覽餐廳清單首頁
router.get('/', (req, res) => {
  RestList.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

//匯出路由器
module.exports = router