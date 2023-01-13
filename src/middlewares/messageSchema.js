import Joi from "joi";

const messageSchema = Joi.object({
    to: Joi.string().required(),
    text: Joi.string().required(),
    type: Joi.equal('message').equal('private_message').required()

});

export {messageSchema};