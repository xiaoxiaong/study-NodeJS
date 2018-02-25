var http = require('http');
var fs = require('fs');

// 通过尽早返回以减少嵌套
var server = http.createServer(function (req, res) { //创建HTTP服务器并用回调定义响应逻辑
    getTitles(res); //控制权转交给了getTitles
}).listen(8000, "127.0.0.1");

function getTitles(res) {
    fs.readFile('./titles.json', function (err, data) {
        if (err) return hadError(err, res) //这里不再创建一个else分支，而是直接return，因为如果出错的话，也没必要继续执行这个函数了
        getTemplate(JSON.parse(data.toString()), res);
    })
}

function getTemplate(titles, res) {
    fs.readFile('./template.html', function (err, data) {
        if (err) return hadError(err, res)
        formatHtml(titles, data.toString(), res);
    })
}

function formatHtml(titles, tmp1, res) {
    var html = tmp1.replace('%', titles.join('<li></li>')); //组装HTML页面以显示博客标题
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html); //将HTML页面发送给用户
}

function hadError(err, res) {
    console.log(err);
    res.end('Server Error');
}


