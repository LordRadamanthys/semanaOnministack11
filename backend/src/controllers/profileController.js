const crypto = require('crypto')
const connection = require('../database/connection')


module.exports={
    async list(req, res) {
        const ong_id = req.headers.authorization

        await connection('incidents')
        .select('*')
        .where('ong_id',ong_id)
            .then((response) => {
                return res.json({ response })
            }).catch((error) => {
                return res.json({ error })
            })
    },
}