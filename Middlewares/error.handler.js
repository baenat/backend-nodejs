/* Middleware de error global */
function logErros(error, request, response, next) {
  console.log(error);
  next(error);
}

/* Detecta error para enviar al cliente */
function errorHandler(error, request, response, next) {
  response.status(500).json({
    message: error.message,
    stack: error.stack
  });
}

/* Detecta error de tipo boom para enviar al cliente */
function bommErrorHandler(error, request, response, next) {
  if (error.isBoom) {
    const { output } = error
    response.status(output.statusCode).json(output.payload);
  } else {
    next(error);
  }

}

module.exports = { logErros, errorHandler, bommErrorHandler }
