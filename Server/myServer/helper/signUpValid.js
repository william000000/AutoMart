import Joi from "joi";
const userSchema = Joi.object().keys({
    first_name: Joi.string().alphanum().min(3).max(30).required(),
    last_name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    address: Joi.string().alphanum().min(3).max(30).required(),
    
});

export default userSchema;