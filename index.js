var express = require('express');
var app = express();
var ejs = require('ejs');


app.engine('html',ejs.__express);
app.set('view engine','html');
app.set('views', './views'); //设置模板路径



app.get('/', function(req, res) {
    res.header("Content-Type:text/html; charset=utf-8");
    res.render('index', {
        title: '小伙~你终于还是来了'
    });

});

module.exports = app;