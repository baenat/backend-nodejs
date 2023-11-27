const boom = require('@hapi/boom');

/* Middleware normal */
/* Propiedad de closures javascript */
function validatorHandler(schema, property) {
  return (request, response, next) => {
    const data = request[property]
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;


/*
property:

request.body          => { data: data }
request.params        => product/id
request.query         => (queryParams)   => product?name='name'&other='otherParam'

*/
