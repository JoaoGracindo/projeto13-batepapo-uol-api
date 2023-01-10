import Joi from "joi";

const userSchema = Joi.object({
    "name": Joi.string().required().min(3)
})

export {userSchema}