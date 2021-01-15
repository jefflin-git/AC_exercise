const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//引入mongoose模組擋案
const db = require('../../config/mongoose.js')
//載入model
const RestList = require('../restaurant.js')
const User = require('../user')
const restaurantList = require('../../restaurant.json').results

const SEED_USERS = [
  {
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    email: 'user2@example.com',
    password: '12345678'
  }
]

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  SEED_USERS.forEach((user, index) => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({ email: user.email, password: hash }))
      .then(async (user) => {
        switch (index) {
          case 0:
            const restaurantList1 = []
            for (let i = 0; i <= 2; i++) {
              restaurantList[i].userId = user._id
              restaurantList1.push(restaurantList[i])
            }
            await RestList.insertMany(restaurantList1)
            break
          case 1:
            const restaurantList2 = []
            for (let i = 3; i <= 5; i++) {
              restaurantList[i].userId = user._id
              restaurantList2.push(restaurantList[i])
            }
            await RestList.insertMany(restaurantList2)
            break
        }
      })
      .then(() => {
        console.log('done!')
        process.exit()
      })
  })
})