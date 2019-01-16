# Empezando un Server

Antes una aclaración: [No mas Playgrounds](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/playground_no_mas.md)

Vamos a avanzar y armar nuestro server, armar nuestros schemas, nuestros resolvers. De esta manera podemos dar un paso más a tener nuestra app funcional.

Hagamos algo simple primero, armemos una pequeña API que busque los meses del año por ID, por nombre o cantidad de dias, que ademas pueda guardar quienes cumplen años.

## Configuración Inicial

Yo elegí hacerlo en Glitch, pero si eligen hacerlo en sus maquinas, en la carpeta adecuada inicien Node con

```
npm init
```

Completan todos los campos, como se hace habitualmente.
Voy a usar sintaxis ES2015+ de JS, asi que voy a usar Babel por lo que instalamos un par de paquetes en las dependencias de desarrollo

```
npm install --save-dv babel-cli babel-preset-env babel-preset-stage-0
```

También voy a instalar los modulos de GraphQL para usarlo junto a Express y nodemon

```
npm install --save graphql graphql-express graphql-import
npm install --save nodemon
```
* `nodemon` : para actualizar el server ante cada cambio
* `graphql` : modulo para usar y crear GrahpQL
* `graphql-express` : middleware para express
* `graphql-import` : para importar schemas desde archivos no `.js`

Configuramos Babel, creamos el archivo `.babelrc` y ponemos

```
{
    "presets": [
        "env",
        "stage-0"
    ]
}
```

Actualizamos los scripts con

```
"start": "nodemon ./server.js --exec babel-node -e js"
```

En Glitch simplemente elegimos empezar con Express. Agregamos los modulos usando la interfaz o modificando el JSON.
Quedaria algo asi:

<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/server_node.png" width="500">

Por supuesto creamos el archivo `server.js`, configuramos Express de manera basica para poner el servido escuchando, en Glitch ya esta hecho.
Despues volveremos a retocar el arhivo

```javascript
// Express
import express from 'express'; // Modulo para Express

// Configuramos Express
const app = express();

// Rutas
app.use('/', () => {
    console.log(Andando);
});


// Poner el servidor escuchando
const port = 3000;
app.listen(port, ()=> {
    console.log('Servidor en marcha en '+port);
});
```

## Empecemos

Para armar los Schemas primero a tener en cuenta su sintaxis en general

[Schemas en GrahpQL](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/schemas.md)

Confuso ? Claro ? Masomenos ? Bueno, ahora se va a ser mas simple.

Hagamos lo siguiente:

1. Creamos la carpeta `data`
2. Creamos el archivo `data.js` -> [Aqui el contenido](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/src/data.js) / Nada complicado

En Glitch `new File` -> `data/data.js`
Esto nos va a servir para simular la base de datos, a modo de ejemplo.

Sigamos

3. Creamos la carpeta `graphql`
4. Creamos los archivos `schemas.js`, `schemas.graphql`, `resolvers.js`

En Glitch `new File` -> `data/schemas.js`, -> `data/schemas.graphql`, -> `data/resolvers.js`
Nos deberia quedar algo asi:

<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/server_directorio.png">

## Armar los Schemas

Hay varias formas de armarlos, o bien podemos hacer dentro del archivo `.js` o por separado usando un archivo `.graphql` o `.gql`.

En ambos casos necesitamos importar de graphql una funcion
`import { buildSchema } from 'graphql';`

Si usamos un archivos `.graphql` / `.gql`
`import { importSchema } from 'graphql-import';`

Solo con JS lo que hacemos es encerrar el texto con la sintaxis GrahpQL para definir schemas en con `.
En cambio de la otra forma no encerramos el texto, lo dejamos asi, pero en el archivo `.js` lo convertimos con `importSchema(DIR)`.
`DIR` es el path desde el root del archivo `.grahpql`.

De Cualquier forma lo guardamos en una variable que llamaramos `type`-

Finalmente usamos `buildSchema(type)` y lo exportamos para usarla en `server.js`

Pueden ver los archivos 
* [schemas.js](https://github.com/gastonpereyra/Apuntes_GraphQL/tree/master/src/schemas.graphql)
* [schemas.graphql](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/src/schemas.js)


- - - -
[<kbd>Volver</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/playground_mutation.md)
[<kbd>Inicio</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/README.md)
[<kbd>Siguiente</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/contenido/server_resolvers.md)
