const express = require('express');
const app = express();
const router = express.Router();


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    next();
});


app.use('/', require('./index'));
app.use('/juejin',require('./routes/juejin/list.js'));
app.use('/zhihu_vue_hot', require('./routes/zhihu-vue-hot/list.js'));

app.use('/zhihu_daily', require('./routes/zhihu-daily/zhihu_daily.js'));
app.use('/zhihu_daily_detail', require('./routes/zhihu-daily/detail.js'));



app.use(router);
app.listen(3000,function (req,res) {
    console.log("listening at port 3000~");
});
