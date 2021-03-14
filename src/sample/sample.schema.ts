import Joi from "joi";

export const sampleSchema = Joi.object({
  sample: Joi.string(),
  number: Joi.number().integer()
})