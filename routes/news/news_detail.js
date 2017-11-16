let app = require("express")(),
    Server = require("../../utils/server.js");

/**************
*接口参见：'https://github.com/iMeiji/Toutiao/wiki/%E4%BB%8A%E6%97%A5%E5%A4%B4%E6%9D%A1Api%E5%88%86%E6%9E%90#%E6%99%AE%E9%80%9A%E7%94%A8%E6%B3%95'
**************/

app.get('/', (req, res) => {

    let host = "m.toutiao.com",
        id = req.query.id || `6488853997447807501`,
        path = `/i${id}/info/`,
        data = {};

    //false:http请求  true:https请求
    let fetch = () => {
        console.log(path)
        Server.httpGet(host, data, path, true).then(function (body) {
            res.send({
                msg: "success",
                code: 1,
                data: JSON.parse(body)
            })
        }).catch(function (err) {
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