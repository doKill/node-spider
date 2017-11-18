let app = require("express")(),
    Server = require("../../utils/server.js");

/**************
 *接口参见：'https://github.com/ecitlm/Kugou-api'
 **************/

app.get('/', (req, res) => {

    let host = "m.kugou.com",
                //歌手列表  ;     歌单列表  ;    排行榜500强  ;
        type = ['/singer/list/88?json=true','/plist/index?json=true','/rank/info/?rankid=8888&page=1&json=true'],
        index = Math.floor((Math.random() * type.length)),
        path = type[index],
        data = {};

    //false:http请求  true:https请求
    let fetch = () => {
        console.log(path)
        Server.httpGet(host, data, path, false).then(function (body) {
            res.send({
                msg: "success",
                type:path,
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