const express = require('express');
const cheerio = require("cheerio");
const app     = express();
const request = require("request");
const Iconv   = require('iconv-lite');



function list(req, res) {
    var res = res;
    var url = 'https://www.zhihu.com/topic/20022242/hot';
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
            $('.feed-item').each(function () {
                var title = $(this).find('a.question_link').text().trim().replace(/^\n+|\n+$/g,""),
                    vote = $(this).find('a.zm-item-vote-count').text().trim(),
                    author = $(this).find('.author-link').text().trim(),
                    href = $(this).find('a.question_link').attr('href').trim();
                var tmp = {
                    title: title,
                    vote: vote,
                    author: author,
                    url: "https://www.zhihu.com" + href
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