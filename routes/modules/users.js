//引用Express與Express路由器
const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const errors = []
  const { name, email, password, confirmPassword } = req.body
  if (!email || !password || !confirmPassword) {
    errors.push({ message: ' 所有欄位除了Name以外都是必填 !' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: ' 密碼與確認密碼不相符 ！' })
  }
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: ' 此 Email 已經註冊過了 !' })
        return res.render('register', { errors, name, email, password, confirmPassword })
      }

      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', ' Logout successfully !')
  res.redirect('/users/login')
})

//匯出路由器
module.exports = router