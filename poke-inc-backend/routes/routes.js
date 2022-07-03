const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModels')



router.post('/signup', async (request, response) => {

    const saltSecret = await bcrypt.genSalt(10)
    const secureSecret = await bcrypt.hash(request.body.password, saltSecret)


    const signedUpUser = new signUpTemplateCopy({
        firstName:request.body.firstName,
        middleName:request.body.middleName,
        lastName:request.body.lastName,
        email:request.body.email,
        username:request.body.username,
        password:secureSecret,
    })

    signedUpUser.save().then(data=> {
        response.json(data)  
    })
    .catch(error => {
        response.json(error)
    })
})



module.exports = router

