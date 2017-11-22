const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

/* определяем url адрес */
app.get('/', function(req, res){
  /* передаем клиенту Html страницу */
  res.sendFile(__dirname + '/index.html');
});

/* создаем подключение socket.io */
io.on('connection', function(socket){
  /* создаем нового пользователя, определяем цвет его сообщений, готовим сообщение о новом пользователе */
  let userNew = {};
  userNew.color = '#' + Math.round((Math.random() * (999999 - 100000) + 100000));
  userNew.message = 'Подключился новый пользователь';
  /* передаем данные о новом пользователе пользователю */
  io.emit('some event', userNew);
  /* от пользователя получаем сообщение и возвращаем его в общий чат */
  socket.on('chat message', function(msg){
	  userNew.message = msg;
    io.emit('chat message', userNew);
  });
  /* при отключении пользователя отправляем в общий чат сообщение */
  socket.on('disconnect', function(){
	  userNew.message = 'Пользователь отключился';
    io.emit('some event', userNew);
  });
});
/* запускаем веб сервер на порту 3000 */
http.listen(3000, function(){
  console.log('Start server');
});