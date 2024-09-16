const express = require("express"); //引用 express 模組
const path = require("path"); //引用 path 模組
const fs = require("fs"); //引用fs 模組檔案系統操作，如讀取、寫入檔

const app = express(); //調用函示呼叫啟用express模組功能

app.use((req, res, next) => {
  const filePath = path.join(__dirname, "log", "userEnterlog.txt");

  //HTTP 請求的所有資訊。其中的 rawHeaders 屬性是一個陣列，包含了原始的 HTTP 請求標頭（headers），這些標頭以鍵和值的交替方式存儲。
  //req.rawHeaders 是一個陣列，保存原始大小寫和順序，並以鍵值對交替排列。
  //req.headers 是一個物件，所有標頭名稱都被轉換為小寫，並且可以通過鍵值對的形式直接查詢標頭。
  const { method, url, ip } = req;
  const userIp = ip.split(":")[3];
  const enterTimeStamp = currentTimeStamp();
  const userInfo = `進站時間戳 : ${enterTimeStamp}, 【方法: ${method} 登入地址: ${userIp} 進入路徑: ${url}】\n`;
  fs.appendFile(filePath, userInfo, (error) => {
    if (error) {
      console.log("進站輸寫錯誤 :", error);
    }
  });
  next();
});

// home頁面路由
app.get("/home", (req, res) => {
  res.send("Hello! World");
});

// about頁面路由
app.get("/about", (req, res) => {
  res.send("About Page");
});

// login頁面路由
app.get("/login", (req, res) => {
  res.send("logins Page");
});

// products頁面路由
app.get("/products", (req, res) => {
  res.send("products Page");
});

// admin頁面路由
app.get("/admin", (req, res) => {
  res.send("admin Page");
});

// 404頁面路由,使用一個通用的路由處理器來處理找不到頁面的情況
app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});

// error錯誤頁面路由處理
app.use((err, req, res, next) => {
  const filePath = path.join(__dirname, "log", "errorlog.txt");
  const errTimeStamp = currentTimeStamp();
  const errTxt = `${errTimeStamp} ${err}\n`;
  // 寫入檔案 fs.appendFile()，專門用於將內容追加到檔案末尾。
  fs.appendFile(filePath, errTxt, (error) => {
    if (error) {
      console.log("伺服器應用出錯 :", error);
    }
  });
  res.status(500).send("Something broke!");
});

// 啟動伺服器
const port = 6060;
app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}/home`);
});

function currentTimeStamp() {
  const time = new Date();
  // console.log("Year:", time.getFullYear());
  // console.log("Month:", time.getMonth() + 1);
  // console.log("Day:", time.getDate());
  // console.log("Hours:", time.getHours());
  // console.log("Minutes:", time.getMinutes());
  // console.log("Seconds:", time.getSeconds());

  // console.log("ISO String:", time.toISOString());
  // console.log("Local String:", time.toLocaleString());
  // console.log("Local Date String:", time.toLocaleDateString());
  // console.log("Local Time String:", time.toLocaleTimeString());
  // console.log("UTC Date String:", time.toUTCString());
  return time.toLocaleString();
}
