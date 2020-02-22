const express = require("express");
const app = express();
const router = express.Router();

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  next();
});

app.use("/", require("./index"));
app.use("/juejin", require("./routes/juejin/list.js"));
app.use("/zhihu_vue_hot", require("./routes/zhihu-vue-hot/list.js"));

app.use("/zhihu_daily", require("./routes/zhihu-daily/zhihu_daily.js"));
app.use("/zhihu_daily_detail", require("./routes/zhihu-daily/detail.js"));

app.use("/toutiao_news_list", require("./routes/news/news_list.js"));
app.use("/toutiao_news_detail", require("./routes/news/news_detail.js"));
app.use("/news_video_list", require("./routes/news/video_list.js"));

app.use("/joke", require("./routes/joke/joke.js"));
app.use("/joke_pic", require("./routes/joke/joke_pic.js"));

app.use("/os_update", require("./routes/oschina-update/update.js"));

app.use("/random_list", require("./routes/kugou/random_list.js"));
app.use("/music_detail", require("./routes/kugou/music_detail.js"));

app.use("/huaban_img", require("./routes/beauty/huaban_img.js"));
app.use("/meizi_list", require("./routes/beauty/meizi_list.js"));
app.use("/meizi_detail", require("./routes/beauty/meizi_detail.js"));

app.use("/weather", require("./routes/weather/weather.js"));

// 齐鲁晚报
app.use("/qilu", require("./routes/qilu/qilu.js"));

//猫扑
app.use("/maopu", require("./routes/maopu/maopu.js"));

app.use("/daylines/mingyan", require("./routes/dayLines/mingyan.js"));

app.listen(3000, function(req, res) {
  console.log("listening at port 3000~");
});
