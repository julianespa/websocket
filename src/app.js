const express = require('express')
const { Server } = require('socket.io')

const app = express()
const server = app.listen(8080,()=>console.log('Listening on port 8080'))

app.use(express.static(__dirname+'/public'))

const io = new Server(server)

let log = []

io.on('connection', socket=>{
    console.log('Nuevo cliente conectado')
    socket.emit('history', log)
    socket.on('message', data =>{
        console.log(data)
        log.push({userId:socket.id,message:data})
        io.emit('history', log)
    })
})

