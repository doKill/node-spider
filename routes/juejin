const express = require('express');
const cheerio = require("cheerio");
const app     = express();
const request = require("request");
const Iconv   = require('iconv-lite');



function list(req, res) {
    var res = res;
    var url = 'https://juejin.im/welcome/frontend';
    console.log(url)

    request({
        url: url,
        encoding: null
    }, function (error, response, body) {
        var links = [];
        if (!(response && response.statusCode == 200)) {
            res.send({
                msg: "糟糕!!! 网络好像有点问题",
                code: 0
            })
        } else {
            var body = Iconv.decode(body, 'utf-8');
            $ = cheerio.load(body);
            $('.entry-list>li').each(function () {
                var title = $(this).find('a.title').text();
                var href = $(this).find('a.entry-link').attr('href');
                var date = $(this).find('.meta-list li').eq(2).text();
                var tmp = {
                    title: title,
                    date: date,
                    url: "https://juejin.im" + href
                };
                links.push(tmp);
            });
            res.send({
                msg: "success",
                data: links,
                code: 1
            });
        }
    });
}

app.get('/', function (req, res) {
    list(req, res)
});
module.exports = app;