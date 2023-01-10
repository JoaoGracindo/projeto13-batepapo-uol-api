import Joi from "joi";

const messageSchema = Joi.object({
    to: Joi.string().required(),
    text: Joi.string().required(),
    type: Joi.any().allow('message', 'private_message').required(),

})

export {messageSchema}