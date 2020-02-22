const app = require("express")();
const puppeteer = require("puppeteer");
const url = "https://www.mingyantong.com/";

app.get("/", async (req, res) => {
  let browser = await puppeteer.launch({
    headless: true
  }); //使用设置参数运行一个浏览器
  let page = await browser.newPage(); // 浏览器创建一个新tab页

  let flag = new Date();
  if (new Date() != flag) {
    page.reload();
  }

  await page.goto(url, { waitUntil: "domcontentloaded" }); //请求页面
  await page.waitFor("#block-views-recom-block_1");

  let list = await page.$$eval(
    `#block-views-recom-block_1 .view-content .views-row .views-field-phpcode`,
    eles =>
      eles.map(ele => {
        let title = ele.querySelector(".views-field-phpcode-1 a").innerText;
        let author = ele.querySelector(".xqjulistwafo a").innerText;
        let from = ele.querySelector(".xqjulistwafo span a").innerText;

        return { title, author, from };
      })
  );
  res.send({ data: list });
  list = null;

  // 关闭浏览器
  browser.close();
});

module.exports = app;
