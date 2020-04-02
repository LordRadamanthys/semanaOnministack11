const crypto = require('crypto')
const connection = require('../database/connection')



module.exports = {

    async list(req, res) {
        const { page = 1 } = req.query
        const [count] = await connection('incidents').count()
        await connection('incidents')
        .join('ongs','ongs.id','=','incidents.ong_id')
            
            .select('incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf',
            )
            .then((response) => {
                res.header('X-Total-Count',count['count(*)'])
                return res.json(response )
            }).catch((error) => {
                return res.json( error )
            })

          
    },

    async create(req, res) {
        const { title, description, value } = req.body
        const ong_id = req.headers.authorization

        await connection('incidents').insert({
            ong_id,
            title,
            description,
            value
        }).then((response) => {
            return res.json( response )
        }).catch((error) => {
            return res.json({ error: error.message })
        })
    },

    async delete(req, res) {
        const { id } = req.params
        const ong_id = req.headers.authorization

        const incident = await connection('incidents')
            .select('ong_id')
            .where('id', id)
            .first()
        // console.log(incident)

        if (incident.ong_id != ong_id) {
            return res.status(401).json({ error: "operação não permitida" })
        }

        await connection('incidents').where('id', id).delete().then((response) => {
            return res.status(204).send()
        }).catch((erro) => {
            return res.send(erro.message)
        })

    }



}