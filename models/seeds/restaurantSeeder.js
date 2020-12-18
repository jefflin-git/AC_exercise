const mongoose = require('mongoose')
const RestList = require('../restaurant.js')
const restaurantList = require('../../restaurant.json')
// 設定連線到 mongoDB
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < restaurantList.results.length; i++) {
    RestList.create(restaurantList.results[i])
  }
  console.log('done!')
})