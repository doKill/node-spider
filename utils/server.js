const express = require('express')
var http = require('http')
const app = express()
const querystring = require("querystring");
const request = require("request");


function httpGet(host, data, path, status) {
    console.log("===================HttpGet=====================");
    var options = {
        host: host,
        port: 80,
        path: path + querystring.stringify(data),
        method: 'GET',
        encoding: null,
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36'
        }
    };

    //判断是否为https请求
    if (status) {
        http = require('https');
        options.port = 443
    }

    return new Promise(function (resolve, reject) {
        let body = "";
        var get_req = http.request(options, function (response) {

            response.on("data", function (chunk) {
                body += chunk;
            })

            response.on('end', () => {
                resolve(body)
            })

            response.on('error', err => {
                reject(err)
            })
        })
        get_req.end();
    });
};


module.exports = {
    httpGet
}