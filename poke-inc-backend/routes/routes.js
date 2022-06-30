const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModels')

router.post('/signup', (request, response) => {
    const signedUpUser = new signUpTemplateCopy({
        firstName:request.body.firstName,
        middleName:request.body.middleName,
        lastName:request.body.lastName,
        email:request.body.email,
        username:request.body.username,
        password:request.body.password,
    })
    signedUpUser.save().then(data=> {
        response.json(data)  
    })
    .catch(error => {
        response.json(error)
    })
})

module.exports = router

