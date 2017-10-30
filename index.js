var app = require("express")();
var path = require("path");

app.get("/",function(req,res){
    var html = path.resolve(__dirname,"./h5/index.html");
    res.sendFile(html)
});

module.exports = app;
