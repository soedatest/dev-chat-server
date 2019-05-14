const express = require('express')
const app = express()
app.get('/', function(req, res){
  console.log('hello world')
  res.send('hello world')
})
const server = app.listen(3000)
