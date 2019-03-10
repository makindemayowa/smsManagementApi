const Joi = require("joi");

module.exports = {
  createContact: Joi.object({
    name: Joi.string().required(),
    phoneNumber: Joi.string()
      .length(10)
      .required()
  }),
  updateContact: Joi.object({
    name: Joi.string(),
    phoneNumber: Joi.string().length(10)
  }),
  createMessage: Joi.object({
    status: Joi.string().valid("pending", "sent", "read")
  }),
  updateMessage: Joi.object({
    status: Joi.string().valid("pending", "sent", "read")
  })
};
