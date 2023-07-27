# devJobs

Aplicación web utilizando Express y Handlebars para desarrolladores, donde las empresas pueden crear ofertas de trabajo y los programadores pueden postular a estas ofertas de trabajo.

## Ejecutar el proyecto

Para ejecutar el proyecto lo primero que se debe de hacer es instalar las dependencias:

```bash
yarn
```

Creamos la base de datos, utilizando `MongoDB`

Configuramos las variables de entorno, copiando el archivo `.env.template` al archivo `.env` y configuramos, el puerto en el que queremos que se ejecute el servidor, la información de la cadena de conexión a la base de datos, configuramos nuestro servicio para envió de emails, en este caso para desarrollo se puede usar _Mailtrap_ y para producción se puede usar _GMail_ por ejemplo. Configuramos las keys personales para la autenticación y los JSON Web Tokens.

Instalamos nodemon como dependencia del proyecto o instalación global:

```bash
npm i -g nodemon
yarn add nodemon -D
```

Ejecutamos la aplicación con los comandos:

```bash
yarn dev # -> nodemon
yarn start # -> node
```
