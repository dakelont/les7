const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  let userNew = {};
  userNew.color = '#' + Math.round((Math.random() * (999999 - 100000) + 100000));
  userNew.message = 'Подключился новый пользователь';
  
  io.emit('some event', userNew);

  socket.on('chat message', function(msg){
	userNew.message = msg;
    io.emit('chat message', userNew);
  });

  socket.on('disconnect', function(){
	userNew.message = 'Пользователь отключился';
    io.emit('some event', userNew);
  });

});

http.listen(3000, function(){
  console.log('Start server');
});