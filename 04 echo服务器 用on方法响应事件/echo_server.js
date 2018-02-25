var net = require('net');

var server = net.createServer(function(socket){
    socket.on('data',function(data){ //当读取到新数据时处理的data事件
        socket.write(data); //数据被写回到客户端
    })
})
server.listen(8888);

//data事件只被处理一次
// var server = net.createServer(function(socket){
//     socket.once('data',function(data){ 
//         socket.write(data); //数据被写回到客户端
//     })
// })
// server.listen(8888);

// 创建事件发射器：一个PUB/SUB的例子
var EventEmitter = require('events').EventEmitter;
var channel = new EventEmitter();
channel.on('join',function(){
    console.log('Welcome!');
});
channel.emit('join'); //用emit函数发射这个事件，不然这个回调永远不会被调用