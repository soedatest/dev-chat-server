const express = require('express')
const app = express()

const date = new Date()

// Redis Connect
const redis = require('redis')
const redisConfig = {
  host: '0.0.0.0',
  port: 6379,
  password: 'password',
  db: 1
}
const redisClient = redis.createClient(redisConfig)
// Insert Test
const key = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
const value = {user:'A', message:'Hello'}
redisClient.set(key, JSON.stringify(value), function(){
  console.log('insert')
})
// Select Test
redisClient.get(key, function(err, val){
  if (err) return console.log(err)
  console.log(val)
  console.log(JSON.parse(val))
})

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