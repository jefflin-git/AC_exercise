// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphdbs = require('express-handlebars')
const handlebars = require('handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const RestList = require('./models/restaurant.js')

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
})

// setting template engine
app.engine('handlebars', exphdbs({ defaultlayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// register helper
handlebars.registerHelper('ifEquals', function (job, targetJob, options) {
  if (job === targetJob) {
    return options.fn(this)
  }
  return options.inverse(this)
})

// routes setting
//瀏覽餐廳清單
app.get('/', (req, res) => {
  RestList.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})
//瀏覽餐廳細節
app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  RestList.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})
//新增餐廳頁面
app.get('/new', (req, res) => res.render('new'))
//新增餐廳功能路由
app.post('/save', (req, res) => {
  const addRestaurant = req.body
  RestList.create(addRestaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
//搜尋
app.get('/search', (req, res) => {
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
//修改功能路由
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  RestList.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
//修改頁面路由
app.post('/restaurants/:restaurant_id/save', (req, res) => {
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
app.post('/restaurants/:restaurant_id/delete', (req, res) => {
  const id = req.params.restaurant_id
  RestList.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}  at Time: ${Date()}`)
})