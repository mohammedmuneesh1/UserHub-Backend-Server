const Joi = require("joi")


 const userRegisterValidation = Joi.object({
    userName: Joi.string().min(4).pattern(/^[a-zA-Z0-9_]+$/).max(10).required(),
    age:Joi.number().min(1).max(3),
    name:Joi.string().min(2).max(10).required(),
    password:Joi.string().min(8).max(20).required(),
    email:Joi.string().email(),
    location: Joi.string().uri()
})

 const userLoginValidation = Joi.object({
    userName:Joi.string().required(),
    password:Joi.string().required(),
})

 const userProfileUpdateValidation = Joi.object({
    location:Joi.string().uri(),
    name:Joi.string().min(2).max(10),
    age:Joi.number().max(3),
    emai:Joi.string().uri,

})



module.exports = {
    userRegisterValidation,
    userLoginValidation,
    userProfileUpdateValidation
    
}