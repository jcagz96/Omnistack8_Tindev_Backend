const  { Schema, model }  = require('mongoose')

const DevSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    user:{
        type: String,
        required: true,
    },
    bio: String,
    avatar:{
        type: String,               //endereço para a imagem
        required: true
    },
    likes:[{
        type: Schema.Types.ObjectId,
        ref: 'Dev',                                         //referenciando a collection Dev
    }],
    dislikes:[{
        type: Schema.Types.ObjectId,
        ref: 'Dev',                                         //referenciando a collection Dev
    }],
},{
    timestamps: true,
})

module.exports = model('Dev', DevSchema)