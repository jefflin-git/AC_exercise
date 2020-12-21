//引入mongoose模組擋案
const db = require('../../config/mongoose.js')
//載入model
const RestList = require('../restaurant.js')
const restaurantList = require('../../restaurant.json')

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < restaurantList.results.length; i++) {
    RestList.create(restaurantList.results[i])
  }
  console.log('done!')
})