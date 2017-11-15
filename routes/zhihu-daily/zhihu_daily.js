let app = require("express")(),
    Server = require("../../utils/server.js");

/**************
*接口参见：'https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90'
**************/


app.get('/', (req, res) => {
    let host = "news-at.zhihu.com",
        path = "/api/4/news/latest",
        data = {}
    Server.httpGet(host, data, path, true).then((body) => {
        res.send({
            msg: "success",
            code: 1,
            data: JSON.parse(body)
        });
        console.log(JSON.parse(body).stories.length)
    }).catch((err) => {
        res.send({
            msg: "糟糕!!! 网络好像有点问题",
            code: 0
        })
        console.log(err)
    })
});

module.exports = app;