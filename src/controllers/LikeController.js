const Dev = require('../models/Dev')

module.exports = {
    async store(req,res){

        console.log(req.io, req.connectedUsers)

        const { user } = req.headers
        const { devId } = req.params                                 // req.params é usado para aceder a um parametro que vem da rota
       

        const loggedDev = await Dev.findById(user)                   //istancia do user na bd
        const targetDev =  await Dev.findById(devId)

        if(!targetDev){
            return res.status(400).json({error: 'Dev nos exists'})
        }

        if(targetDev.likes.includes(loggedDev._id)){                   //se a pessoa onde vai ser dado like ja deu like em "nós" entao temos um match
            const loggedSocket = req.connectedUsers[user]
            const targetSocket = req.connectedUsers[devId]

            if(loggedSocket){
                req.io.to(loggedSocket).emit('match', targetDev)
            }

            if(targetSocket){
                req.io.to(targetSocket).emit('match', loggedDev)
            }
        }

        loggedDev.likes.push(targetDev._id)                            //guardar o id do targetDev
        await loggedDev.save()                                         // força a atualização da base de dados

        return res.json(loggedDev)
    }
}