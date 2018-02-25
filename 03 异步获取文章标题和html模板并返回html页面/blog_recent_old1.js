var http = require('http');
var fs = require('fs');

// 这里嵌入了三层回调
http.createServer(function (req, res) { //创建HTTP服务器并用回调定义响应逻辑
    if (req.url == '/') {
        fs.readFile('./titles.json', function (err, data) {
            if (err) {
                console.log(err);
                res.end('Server Error');
            } else {
                var titles = JSON.parse(data.toString()); //从JSON文本中解析数据
                fs.readFile('./template.html', function (err, data) {
                    if (err) {
                        console.log(err);
                        res.end('Server Error');
                    } else {
                        var tmp1 = data.toString();
                        var html = tmp1.replace('%', titles.join('<li></li>')); //组装HTML页面以显示博客标题
                        res.end(html); //将HTML页面发送给用户
                    }
                });
            }
        });
    }
}).listen(8000, "127.0.0.1");