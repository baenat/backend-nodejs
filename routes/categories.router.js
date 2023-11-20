/* Se utiliza el mini framework de express */
const express = require('express');

/* Generamos router especifico para productos */
const router = express.Router();

/* Parametros :categoryId , :productId */
router.get('/:categoryId/products/:productId', (request, response) => {
  const { categoryId, productId } = request.params;
  response.json({
    categoryId,
    productId,
  });
});

module.exports = router;
