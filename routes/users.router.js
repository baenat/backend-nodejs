/* Se utiliza el mini framework de express */
const express = require('express');
/* Generamos router especifico para productos */
const router = express.Router();

/* Query params api/products?page=1&offset=0 */
router.get('/', (request, response) => {
  const { limit, offset } = request.query;
  if (limit && offset) {
    response.json({
      limit,
      offset
    });
  } else {
    response.send('No hay registros')
  }
});

module.exports = router;
