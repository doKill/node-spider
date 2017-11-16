let app = require("express")(),
    Server = require("../../utils/server.js");

app.get('/', (req, res) => {

    let host = "api.laifudao.com",
        path = `/open/tupian.json`,
        data = {};

    //false:http请求  true:https请求
    let fetch = () => {
        console.log(path)
        Server.httpGet(host, data, path, false).then((body) => {
            res.send({
                msg: "success",
                code: 1,
                data: eval('(' + body + ')')
            })
        }).catch((err) => {
            fetch()
        });
    };

    fetch();
});

module.exports = app;