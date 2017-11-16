let app = require("express")(),
    Server = require("../../utils/server.js");

app.get('/', (req, res) => {

    let host = "api.laifudao.com",
        path = `/open/xiaohua.json`,
        data = {};

    //false:http请求  true:https请求
    let fetch = () => {
        console.log(path)
        Server.httpGet(host, data, path, false).then((body) => {
            res.send({
                msg: "success",
                code: 1,
                data: JSON.parse(body)
            })
        }).catch((err) => {
            res.send({
                msg: "fail",
                code: 0
            })
            console.log(err)
        });
    };

    fetch();
});

module.exports = app;