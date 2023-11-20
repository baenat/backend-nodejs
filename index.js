/* Se utiliza el mini framework de express */
const express = require('express');

/* Archivo de rutas */
const routerApi = require('./routes/routers');

/* Importamos los middlewares */
const { logErros, bommErrorHandler, errorHandler } = require('./Middlewares/error.handler');

/* Metodo para crear la aplicacion */
const app = express();
const port = process.env.port || 3004;

/* Utilizar middleware para recibir inhero de tipo JSON que se envia por POST */
/* Middleware de express que me permite recibir la información de POST en formato JSON */
app.use(express.json());

/* Definicion de las rutas */
app.get('/', (req, res) => {
  res.send('Server en Node.js con express');
});

/* Llamado a la funcion de rutas */
routerApi(app);

/* Utilizar los middlewares */
app.use(logErros);
app.use(bommErrorHandler);
app.use(errorHandler);

/* Escuchamos el puerto especificado */
app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
