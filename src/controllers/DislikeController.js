const Dev = require('../models/Dev')

module.exports = {
    async store(req,res){


        const { user } = req.headers
        const { devId } = req.params                                 // req.params é usado para aceder a um parametro que vem da rota
       

        const loggedDev = await Dev.findById(user)                   //istancia do user na bd
        const targetDev =  await Dev.findById(devId)

        if(!targetDev){
            return res.status(400).json({error: 'Dev nos exists'})
        }

        

        loggedDev.dislikes.push(targetDev._id)                            //guardar o id do targetDev
        await loggedDev.save()                                         // força a atualização da base de dados

        return res.json(loggedDev)
    }
}






// é importante guardar a lista de dislikes pq quando carregar os perfis na web nao estar a carregar perfis em que já se deu dislike