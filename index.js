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
io.on('connection', function(socket){
  console.log(socket.id)
  socket.on('SEND', function(data){
    console.log(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' [username]' + data.username + '[message]' + data.message)
    io.emit('MESSAGE', data)
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