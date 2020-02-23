let app = require("express")(),
  cheerio = require("cheerio"),
  request = require("request"),
  Iconv = require("iconv-lite");

function list(req, res) {
  var res = res;
  var url = "https://www.zhihu.com/topic/20022242/hot";

  request(
    {
      url: url,
      encoding: null
    },
    function(error, response, body) {
      var links = [];
      if (!(response && response.statusCode == 200)) {
        res.send({
          msg: "糟糕!!! 网络好像有点问题",
          code: 0
        });
      } else {
        var body = Iconv.decode(body, "utf-8");
        $ = cheerio.load(body);
        $(".List-item").each(function() {
          var title = $(this)
              .find(".ContentItem-title")
              .text(),
            author = $(this)
              .find(".AuthorInfo-head .UserLink-link")
              .text(),
            href = $(this)
              .find(".ContentItem-title a")
              .attr("href"),
            vote = $(this)
              .find(".ContentItem-actions span button")
              .text()
              .replace(/赞同 /, "");
          var tmp = {
            title,
            author,
            href,
            vote
          };
          links.push(tmp);
        });
        res.send({
          msg: "success",
          data: links,
          code: 1
        });
      }
    }
  );
}

app.get("/", function(req, res) {
  list(req, res);
});
module.exports = app;
