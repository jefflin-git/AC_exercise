//引用Express與Express路由器
const express = require('express')
const { readyState } = require('../../config/mongoose')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

//匯出路由器
module.exports = router