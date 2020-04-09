const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
    async create(req,res){
        const {name, email, whatsapp, city, uf} = req.body
        const id =  crypto.randomBytes(4).toString('HEX')
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        }).then((response)=>{
            return res.json(id)
        }).catch((erro)=>{
            return res.json(erro)
        })
       // console.log(data)
    },

    async list(req,res){
        await connection('ongs').select('*').then((response)=>{
            return res.json(response)
        }).catch((erro)=>{
            return res.json(erro)
        })
    },
}