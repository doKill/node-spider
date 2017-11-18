let fs = require("fs"),
    path = require("path"),
    request = require("request"),
    app = require("express")();


/*********************************************************************
**
**api取自https://github.com/jokermonn/-Api/blob/master/CenterWeather.md
**
***********************************************************************/

let fetch = (req, res) => {

    let city = req.query.city || '上海',
        code = ``,
        dir = path.resolve(__dirname, 'city_code.json');

    fs.readFile(dir, (err, data) => {
        if (!err && data) {
            let result = JSON.parse(data);

            for (let i in result) {
                if (city === result[i].townName) {
                    code = result[i].townID;
                }
            }

        } else {
            console.log(err)
        };

        let url = `http://tj.nineton.cn/Heart/index/all?city=${code}`
        connectApi(url, res);
    });
}

let connectApi = (url, res) => {
    request({
        url: url,
        encoding: null
    }, (err, response, body) => {
        if (!err && body) {
            res.send({
                msg: "success",
                code: 1,
                data: JSON.parse(body)
            })
        } else {
            res.send({
                msg: "糟糕!!! 网络好像有点问题",
                code: 0
            })
            console.log(err)
        }
    })
}

app.get('/', (req, res) => {
    fetch(req, res)
});
module.exports = app;