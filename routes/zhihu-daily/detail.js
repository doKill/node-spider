let app = require("express")(),
    Server = require("../../utils/server.js");


app.get('/', (req, res) => {
    let host = "news-at.zhihu.com",
        id = req.query.id || 9654714,
        path = `/api/4/story/${id}`,
        data = {};

    Server.httpGet(host, data, path, false).then((body) => {
        res.send({
            msg: "success",
            code: 1,
            data: JSON.parse(body)
        })
    }).catch((err) => {
        res.send({
            msg: "糟糕!!! 网络好像有点问题",
            code: 0
        })
        console.log(err)
    });
})

module.exports = app;