const express = require('express')
const app = express()

const date = new Date()

const server = app.listen(3000, function() {
  console.log('listen 3000')
})
const io = require('socket.io')(server)
io.on('connection', function(socket){
  console.log(socket.id)
  socket.on('SEND', function(data){
    console.log(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' [username]' + data.username + '[message]' + data.message)
    io.emit('MESSAGE', data)
  })
})