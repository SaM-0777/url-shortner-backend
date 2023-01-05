import Joi from "joi";

// VALIDATION
const ValidationSchema = Joi.object({
  username: Joi.string().min(5).max(20).required(),
  /*email: Joi.string()
    .email()
    .min(5)
    .max(64)
    .required(),*/
  password: Joi.string()
    /*.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))*/
    .min(8)
    .max(64)
    .required(),
});


export default ValidationSchema;

