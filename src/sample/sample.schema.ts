const Joi = require("joi")

export const sampleSchema = Joi.object({
  sample: Joi.string(),
  number: Joi.number().integer()
})
