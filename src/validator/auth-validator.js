const Joi = require("joi");

exports.registerSchema = Joi.object({
  firstName: Joi.string().required().trim(),
  //ต้องเป็น String ต้องไม่เป็นค่าว่าง ถ้ากดสเปตบาร์มาให้ตัดออก
  lastName: Joi.string().required().trim(),
  //ต้องเป็น String ต้องไม่เป็นค่าว่าง ต้องอยู่ในรูปแบบที่กำหนด
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9]{6,}$/),
  //ต้องเป็น siring ต้องไม่เป็นค่าว่าง valid ว่าตรงกับ password ไหม เเล้วตัดทิ้ง
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).strip(),
  //ต้องเป็น String ต้องไม่เป็นค่าว่าง ถ้ากดสเปตบาร์มาให้ตัดออก ต้องอยู่ในรูปแบบที่กำหนด
  phone: Joi.string()
    .required()
    .trim()
    .pattern(/^[0-9]{10}$/),
  //ต้องเป็น String  ต้องไม่เป็นค่าว่าง ต้องเป็นรูปแบบอีเมล
  email: Joi.string().required().email({ tlds: false }),
  building: Joi.required(),
  room: Joi.required(),
});
