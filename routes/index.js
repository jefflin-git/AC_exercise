//引用Express與Express路由器
const express = require('express')
const router = express.Router()

//引入home模組程式碼
const home = require('./modules/home.js')
//引入restaurants模組程式碼
const restaurants = require('./modules/restaurants.js')
//引入search模組程式碼
const search = require('./modules/search.js')
//引入sort模組程式碼
const sort = require('./modules/sort.js')
//引入create模組程式碼
const create = require('./modules/create.js')
const users = require('./modules/users')

//將網址結構符合 / 字串的request導向home模組
router.use('/', home)
//將網址結構符合 /restaurants字串開頭的request導向restaurants模組
router.use('/restaurants', restaurants)
//將網址結構符合 /search字串開頭的request導向search模組
router.use('/search', search)
//將網址結構符合 /sort字串開頭的request導向search模組
router.use('/sort', sort)
//將網址結構符合 /new字串開頭的request導向search模組
router.use('/create', create)
router.use('/users', users)
//匯出路由器
module.exports = router