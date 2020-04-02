const express = require('express')
const {celebrate, Segments, Joi} = require('celebrate')
const routes = express.Router()
const ongsController = require('./controllers/ongController')
const incidentController = require('./controllers/incidentController')
const profileController = require('./controllers/profileController')
const sessionController = require('./controllers/sessionController')


routes.post('/sessions', sessionController.create)


routes.get('/ongs', ongsController.list)

routes.post('/ongs',  celebrate({
    [Segments.BODY]:Joi.object().keys({
        name:Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        city: Joi.string().required(),
        uf:Joi.string().required().length(2),
    })

}),ongsController.create )

routes.post('/incidents',  incidentController.create )

routes.get('/incidents',  celebrate({
    [Segments.QUERY]:Joi.object().keys({
        page:Joi.number()
    }).unknown()
}), incidentController.list )

routes.get('/profile', celebrate({
    [Segments.HEADERS]:Joi.object().keys({
        authorization:Joi.string().required()
    }).unknown()
}), profileController.list )


routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]:Joi.object().keys({
        id:Joi.number().required()
    })
}), incidentController.delete )


module.exports = routes