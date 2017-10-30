var app = require("express")(),
	cheerio = require("cheerio"),
	request = require("request"),
	iconv = require('iconv-lite');

app.get("/", function (req, res) {
	fetch(req, res);
});

function fetch(req, res){
	var config = {
		url: 'http://caibaojian.com/c/news',
		encoding: null
	};
	console.log(config);

	request(config, function (e, r, b) {
		if (e) return console.log(e);
		var result = [];
		console.log(r)
	})
}