let app = require("express")(),
    Server = require("../../utils/server.js");


app.get('/', (req, res) => {

    let fetch = () => {

                    // 搞笑视频  美女视频  体育视频   新闻现场 涨姿势  猎奇   黑科技 默认搞笑视频
        let type = ['VAP4BFE3U', 'VAP4BG6DL', 'VBF8F2E94', 'VAV3H6JSN', 'VBF8F3SGL', 'VBF8ET3S2', 'VBF8F2PKF', 'VAP4BFE3U'],
            index = Math.floor((Math.random() * type.length)),
            aim = type[index],
            page = parseInt(req.query.page) || 0;

        let host = "c.m.163.com",
            path = `/nc/video/list/${aim}/y/${page}-10.html`,
            data = {};

        console.log(path)
        Server.httpGet(host, data, path, false).then(function (body) {
            res.send({
                msg: "success",
                code: 1,
                length: JSON.parse(body)[aim].length,
                data: JSON.parse(body)
            })
        }).catch(function (err) {
            fetch()
        })
    };

    fetch();
});

module.exports = app;