const express = require('express')
const app = express()

const date = new Date()

// Redis Connect
const { promisify } = require('util')
const redis = require('redis')
const redisConfig = {
  host: '0.0.0.0',
  port: 6379,
  password: 'password',
  db: 1
}
const redisClient = redis.createClient(redisConfig)

// Redis CRUD
const getAsync = promisify(redisClient.get).bind(redisClient)
const setAsync = promisify(redisClient.set).bind(redisClient)
const keysAsync = promisify(redisClient.keys).bind(redisClient)

async function getKeys() {
  const res = await keysAsync('*')
  console.log(res)
}
async function getData(key) {
  const res = await getAsync(key)
  console.log(res)
}
async function setData(data) {
  const res = await setAsync(data.k, data.v)
  console.log(res)
} 

// Listen server
const server = app.listen(3000, function() {
  console.log('listen 3000')
})

// Socet
const io = require('socket.io')(server)
const room = []
io.on('connection', function(socket){
  // Connct Confirm
  console.log('Client Connect : %s', socket.id)
  // Room setting
  socket.on('INIT', function(req) {
    // クライアントをroomに追加
    socket.join(req.room)
    // クライアントに対してメッセージ送信
    io.to(socket.id).emit('MESSAGE', { message: `この部屋は${req.room}` })
    // roomに対してメッセージ送信
    io.to(req.room).emit('MESSAGE', { message: `${socket.id}さんが入室しました` })
    room[socket.id] = req.room
  })
  socket.on('SEND', function(data){
    console.log(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '[message]' + data.message)
    io.to(room[socket.id]).emit('MESSAGE', data)
  })
})


// Redis Test
function redisTest () {
  getKeys()
  getData('20:41:25')
  // setData({
  //   k: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
  //   v: JSON.stringify({user:'A', message:'Hello world'})
  // })
}
// redisTest()