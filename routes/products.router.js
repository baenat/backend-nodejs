/* Se utiliza el mini framework de express */
const express = require('express');

/* Capa de servicios de productos */
const ProductService = require('./../services/product.service');

/* Middleware para validar la data envida */
const validatorHandler = require('../middlewares/validator.handler');

/* Esquemas  */
const { createProductSchema, getProductoSchema, updateProductSchema, deleteProductSchema } = require('./../schemas/product.schema');

/* Generamos router especifico para productos */
const router = express.Router();

/* Instanciamos la clase de producto */
const service = new ProductService();

/* Obtener todos los productos */
router.get('/', async (request, response, next) => {
  try {
    const products = await service.find();
    /* Respuesta en formato de json */
    response.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

/* Productos filtrados */
router.get('/filter', (request, response) => {
  response.send('Soy el filter')
});

/* Producto por :id */
router.get('/:id',
  validatorHandler(getProductoSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const product = await service.findOne(id);
      response.status(200).json(product);
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (request, response) => {
    const body = request.body;
    const id = await service.create(body);
    response.status(201).json({
      message: 'created',
      id
    });
  }
);

router.patch('/:id',
  validatorHandler(getProductoSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const body = request.body;
      const product = await service.update(id, body);
      response.json({
        message: 'update product',
        data: product
      });
    } catch (error) {
      next(error)
    }
  }
);

router.delete('/:id',
  validatorHandler(deleteProductSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const resp = await service.delete(id);
      response.json({
        message: 'deleted',
        id: resp
      });
    } catch (error) {
      next(error)
    }
  }
);

module.exports = router;
