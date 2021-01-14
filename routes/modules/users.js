//引用Express與Express路由器
const express = require('express')
const { readyState } = require('../../config/mongoose')
const router = express.Router()

router.get('/login', (req, res) => {
  res.send('login')
})

router.get('/register', (req, res) => {
  res.send('register')
})

//匯出路由器
module.exports = router