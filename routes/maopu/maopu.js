let app = require("express")(),
    request = require("request"),
    cheerio = require("cheerio"),
    Iconv = require("iconv-lite"),
    path = require("path");


let fetch = (req, res) => {
    
    let data = {};
    let url = `http://www.mop.com/`,
        headers = {
            "Connection": "keep-alive",
            "content-type": "application/json",
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
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
            data.swiper = [];
            $('.swiper-slide a').each(function() {
                let href = $(this).attr('href'),
                    img = $(this).find('img').attr('src');
                    title = $(this).find('.swiper-mop h2').text();
                
                data.swiper.push({
                    'title':title,
                    'href':href,
                    'img':img
                });
                data.swiper = data.swiper.slice(0,5);
            });
            res.send({
                msg: "success",
                data: data,
                code: 1
            });
        } else {
            res.send({
                msg: "糟糕!!! 网络好像有点问题",
                code: 0
            })
            console.log(err)
        }
    });
};

app.get('/', (req, res) => {
    fetch(req, res);
});

module.exports = app;

