let app = require("express")(),
    request = require("request"),
    cheerio = require("cheerio"),
    Iconv = require("iconv-lite"),
    path = require("path");


let fetch = (req, res) => {

    let url = `http://m.qlwb.com.cn/`,
    headers = {
        "Connection": "keep-alive",
        "content-type": "application/json",
    	'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
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
            let result = [];
            $('.p22').each(function () {
                let text = $(this).find('a').text(),
                    link = $(this).find('a').attr('href');

                result.push({
                    'text':text,
                    'link':link
                });
            });
            res.send({
                msg: "success",
                data: result,
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

