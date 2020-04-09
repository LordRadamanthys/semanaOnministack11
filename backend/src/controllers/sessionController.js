const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
    async create(req, res){
        const { id } = req.body
        let ong = await connection('ongs').where('email',id).orWhere('id',id).select('name','id').first()
       
       

        if(!ong){
            return res.status(400).json({erro:"usuario não encontrado"})
        }

        return res.json(ong)
    }
}