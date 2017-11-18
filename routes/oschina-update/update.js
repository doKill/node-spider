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
        if (!err && response && response.statusCode == 200) {
            body = Iconv.decode(body, 'utf-8');
            $ = cheerio.load(body);
            
            let result = [];
            $('.item').each(() => {
                let title = $(this).find('.text-ellipsis').text(),
                    url = "http://www.oschina.net" + $(this).find('.title').attr('href') || "",
                    text = $(this).find('.summary').text(),
                    author = $(this).find('.mr a').text();
                let tmp = {
                    title:title,
                    url:url,
                    text:text,
                    author:author
                };
                result.push(tmp);
            })
            res.send({
                msg:'success',
                code:1,
                data:result
            })
        } else {
            res.send({
                msg: 'fail',
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

