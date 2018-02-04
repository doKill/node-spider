let app = require("express")(),
    request = require("request"),
    cheerio = require("cheerio"),
    Iconv = require("iconv-lite");

/*************
 *列表详情
 *************/

let fetch = (req, res) => {
    let id = req.query.id || 5585,
        url = `http://www.meizitu.com/a/${id}.html`;
    request({
        url: url,
        encoding: null,
    }, (err, response, body) => {
        if (response && response.statusCode == 200) {
            body = Iconv.decode(body, 'gb2312');
            $ = cheerio.load(body);
            let datas = { links :[] };
            datas.title = $(".metaRight h2 a").text();
            $('#picture img').each(function () {
                let link = $(this).attr('src');
                datas.links.push(link);
            });
            res.send({
                msg: "success",
                data: datas,
                code: 1
            });
        } else {
            res.send({
                msg: "糟糕!!! 网络好像有点问题",
                code: 0
            })
            console.log(err)
        }
    })
};

app.get('/', (req, res) => {
    fetch(req, res);
});

module.exports = app;