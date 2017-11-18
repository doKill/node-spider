let app = require("express")(),
    Server = require("../../utils/server.js");

/**************
 *接口参见：'https://github.com/ecitlm/Kugou-api'
 **************/

app.get('/', (req, res) => {

    let host = "m.kugou.com",
        hash = req.query.hash || `1035269C05791F1665E36DFFE478326C`,
        path = `/app/i/getSongInfo.php?cmd=playInfo&hash=${hash}`,
        data = {};

    //false:http请求  true:https请求
    let fetch = () => {
        console.log(path)
        Server.httpGet(host, data, path, false).then(function (body) {
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