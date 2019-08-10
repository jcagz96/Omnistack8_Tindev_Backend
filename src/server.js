const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')

const routes = require('./routes')

const app = express()
const server = require('http').Server(app)                       //unir servidor http com servidor websocket
const io = require('socket.io')(server)                         // o require retorn uma funcao que recebe um servidor http que passamos como argumento (server)

const connectedUsers = {}

io.on('connection', socket => {
    const { user } = socket.handshake.query
    

    connectedUsers[user] = socket.id
})






mongoose.connect('mongodb+srv://garcez:teste1234@blogapp-prod-rvcpo.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

//Middleware | intermediario                        | vamos modificar o req para que chegue no like controller de forma diferente
app.use((req,res,next)=>{                          // quando a requisicao chegar ela vai para aqui e depois é que segue para as rotas, ao chegar aqui o midleware faz o que quiser com o req e com o res e dps é que avançao para o next , para continuar o fluxo da aplicaçao
    req.io = io                                   //repassando io para o req para usar no controller
    req.connectedUsers = connectedUsers          //repassando connectedUsers para o req para usar no controller

    return next()
})

app.use(cors())                //tem de vir antes do use das rotas  // cors permite aceder ao header ??
app.use(express.json())
app.use(routes)



//server.listen(3333)
server.listen(process.env.PORT || 3333);

// [MVC]          M - Model(abstraçao da bd),     V - View  (front end),        C - Controller(vai armazenar na bd etc)