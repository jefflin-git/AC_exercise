// require packages used in the project
const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const port = process.env.PORT
const exphdbs = require('express-handlebars')
//引入mongoose模組擋案
require('./config/mongoose.js')
const bodyParser = require('body-parser')
const RestList = require('./models/restaurant.js')
//引入method-override
const methodOverride = require('method-override')
//引入路由器
const routes = require('./routes/index.js')
const session = require('express-session')
const usePassport = require('./config/passport')
const locals = require('./middleware/locals')
const flash = require('connect-flash')

// setting template engine
app.engine('handlebars', exphdbs({ defaultlayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

usePassport(app)

app.use(flash())

//設定本地變數
locals(app)

//將傳入伺服器的request導入路由器
app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}  at Time: ${Date()}`)
})