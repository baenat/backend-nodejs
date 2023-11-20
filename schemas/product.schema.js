/* Validacion de datos enviada por el cliente con libreria Joi */
const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(20);
const price = Joi.number().integer().min(100);
const image = Joi.string().uri()


/* Esquema para crear producto */
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
});

/* Esquema para leer producto */
const getProductoSchema = Joi.object({
  id: id.required()
});

/* Esquema para actualizar producto */
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image
});

/* Esquema para eliminar producto */
const deleteProductSchema = Joi.object({
  id: id.required()
});

module.exports = {
  createProductSchema,
  getProductoSchema,
  updateProductSchema,
  deleteProductSchema,
}
