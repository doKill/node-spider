var express = require("express"),
    app = express();

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    next();
});

// 路由
app.use("/dailyPaperIndex", require("./routes/daily-paper-list/index.js"));

// app.use(router)
app.listen(3000, function () {
    console.log("走你~");
});
// module.exports = router;