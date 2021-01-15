# 餐廳清單
採用 Node.js 和 Express 打造的餐廳清單網站，使用者可以在此站上查看餐廳訊息，並可透過餐廳名稱尋找餐廳資訊

## 專案畫面
![登入頁面](https://i.imgur.com/hIzg0xc.png)
![註冊頁面](https://i.imgur.com/3E8QFTT.png)
![清單頁面](https://i.imgur.com/Q2LxwJr.jpg)
![新增餐廳](https://i.imgur.com/bi36LB0.png)
![餐廳資訊](https://i.imgur.com/sAvWvsB.png)
![刪除餐廳](https://i.imgur.com/yvj5uRs.png)
![刪除餐廳](https://i.imgur.com/YD2HabN.png)


## 功能描述 (features)
- 使用者可以註冊帳號，註冊的資料包括：名字、email、密碼、確認密碼。其中 email 與密碼是必填欄位，但名字不是
- 如果使用者已經註冊過、沒填寫必填欄位、或是密碼輸入錯誤，就註冊失敗，並回應給使用者錯誤訊息
- 使用者必須登入才能使用餐廳清單，如果沒登入，會被導向登入頁面
- 使用者也可以透過 Facebook Login 直接登入
- 使用 bcrypt 來處理使用者的密碼
- 登入後，使用者可以建立並管理專屬他的一個餐廳清單
- 若註冊時有填寫Name，在登入後左上角會看到Name的餐廳清單
- 使用者登出、註冊失敗、或登入失敗時，使用者都會在畫面上看到正確而清楚的系統訊息
- 在首頁上查看所有餐廳列表
- 透過搜尋功能找到特定餐廳
- 點選餐廳清單檢視餐廳詳細資訊包含類別、地址、電話、評分、圖片及 Google Map
- 點選左上角"我的餐廳清單"返回首頁
- 新增餐廳
- 修改餐廳的資訊
- 刪除餐廳
- 根據使用者需求排序

## 環境建置(prerequisites)
- Node.js v10.15.0
- Express v4.17.1
- Express-handlebars v5.2.0
- mongoose v5.11.8
- body-parser v1.19.0
- method-override v3.0.0
- bcryptjs v2.4.3
- connect-flash v0.1.1
- dotenv v8.2.0
- express-session v1.17.1
- passport v0.4.1
- passport-facebook v3.0.0
- passport-local v1.0.0

## 安裝與執行步驟 (installation and execution)
- 提醒: 以下動作需使用 terminal 或 Git Bash 指令
1. 將專案cline到本地環境
   ```
   git clone https://github.com/jefflin-git/restaurant_list.git
   ```
2. 進入專案資料夾
   ```
   cd restaurant_list
   ```
3. 至 package.json 檔案裝查看需安裝的npm套件，並搭配以下指令安裝
   ```
   npm install
   ```
4. 安裝 nodemon 套件
   - 提醒: 若先前在本地開發環境中以`npm install -g nodemon` 指令安裝過可跳至下步驟
5. 匯入種子資料
    ```
    npm run seed
    ```
6. 啟動伺服器，執行 app.js 檔案
   - 使用 `nodemon app.js` 或 `npm run dev` 執行
   - 看到回應 `Express is listening on localhost:3000  at Time: (當地時間)` 代表成功執行
7. 開啟任一瀏覽器瀏覽器輸入 http://localhost:3000 開始使用
8. 預設登入帳號
   ```
   email: user1@example.com
   password: 12345678
   ```
    
   ```
   email: user2@example.com
   password: 12345678
   ```

## 專案開發人員 (contributor)
> [Jeff Lin](https://github.com/jefflin-git)
