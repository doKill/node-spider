let app = require("express")(),
    request = require("request"),
    cheerio = require("cheerio"),
    Iconv = require("iconv-lite");


let fetch = (req, res) => {
    let url = `http://www.hbmeinv.com`;
    request({
        url: url,
        encoding: null,
    }, (err, response, body) => {
        if (response && response.statusCode == 200) {
            body = Iconv.decode(body, 'utf-8');
            $ = cheerio.load(body);
            let links = [];
            $('.imgholder').each(function () {
                let title = $(this).find('a').attr('title'),
                    link = $(this).find('a').attr('href'),
                    img = $(this).find('img').attr('src');

                let tmp = {
                    title: title,
                    link: link,
                    img: img
                };
                links.push(tmp);
            });
            res.send({
                msg: "success",
                data: links,
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

