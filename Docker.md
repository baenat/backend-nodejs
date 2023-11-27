### Configuracion de Docker

- Crear el archivo.yml
                    
> docker-compose.yml

- up: levantar | -d: correr en segundo plano | postgres: *servicio* 

> docker-compose up -d *postgres*

- Lista los contenedores de compose en ejecucion, con el estado actual y los puertos expuestos.

> docker-compose ps

- all La bandera se puede utilizar para incluir contenedores detenidos.

> docker-compose ps --all

- Lista en formato JSON

> docker compose ps --format json | jq .

- Dejar de correr los servicios

> docker-compose down

- Guardar datos almacenados en un volumen, ya que docker no tiene estado
> añadir en el docker-compose.yml
> > volumes:
	- ./postgres_data:/var/lib/postgresql/data

- Conectar a la db que esta en ejecucion en el contenedor.

> docker-compose exec postgres bash

- Listará todos los archivos situados en la posición actua
	ls -l

- Empezar a ejecutar comandos una vez dentro
> psql -h localhost -d my_store -U baenat

  ### Servicio para correr motor grafico de pgAdmin
  
- Conexión pgAdmin.

```
# Servicio para correr motor grafico de pgAdmin
pgadmin:
	container_name: pgAdmin
    image: dpage/pgadmin4
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@mail.com
      - PGADMIN_DEFAULT_PASSWORD=root
    ports:
      - 5050:80
```