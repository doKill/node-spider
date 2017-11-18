let app = require("express")(),
    request = require("request"),
    cheerio = require("cheerio"),
    Iconv = require("iconv-lite"),
    path = require("path");


let fetch = (req, res) => {

    let page = req.query.page || 1,
        url = `http://www.oschina.net/action/ajax/get_more_news_list?newsType=project&p=${page}`,
        headers = {
            "Connection": "keep-alive",
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36'
        };

    request({
        url: url,
        encoding: null,
        headers: headers
    }, (err, response, body) => {
        if (response && response.statusCode == 200) {
            body = Iconv.decode(body, 'utf-8');
            $ = cheerio.load(body);
            let link = [];
            $('.item').each(function () {
                let title = $(this).find('.title span').text(),
                    description = $(this).find('.summary').text(),
                    href = "http://www.oschina.net" + $(this).find('.title').attr('href') || "",
                    thumb = $(this).find('.small').attr("src") ? "http://www.oschina.net" + $(this).find('.small').attr("src") : "",
                    date = $(this).find('.mr').eq(0).text().split("于")[1];

                let tmp = {
                    title: title,
                    des:description,
                    href: href,
                    thumb: thumb,
                    date: date
                };
                link.push(tmp);
            });
            res.send({
                msg: "success",
                data: link,
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

