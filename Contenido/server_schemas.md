# Empezando un Server

<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/CumpleQL.png" width="900">

Antes una aclaración: [No mas Playgrounds](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/playground_no_mas.md)

Vamos a avanzar y armar nuestro server, armar nuestros schemas, nuestros resolvers. De esta manera podemos dar un paso más a tener nuestra app funcional.

Hagamos algo simple primero, armemos una pequeña API.

## API

<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/server_api.png">

Que va a hacer:
* Buscar los meses del años por ID, o por nombre. Y mostrarlos.
* Buscar los meses del año por cantidad de Dias, y mostrar todos los que cumplan.
* Mostrar una lista de nombres de personas que cumplan años esos meses.
* Agregar a la lista de nombres uno nuevo.

## Como lo va hacer

Por el front-end no nos preocupemos por ahora, podemos usar una herramienta que nos da GraphQL llamada **GraphiQL** para Express. Ya le hemos usado antes en por ejemplo **GraphQLHub**.

Para el Back-end voy a usar un servidor Node.js con Express, nada complicado.

## Configuración Inicial

Yo elegí hacerlo en Glitch, pero si eligen hacerlo en sus maquinas, en la carpeta adecuada inicien Node con

```
npm init
```

Completan todos los campos, como se hace habitualmente.
Voy a usar sintaxis ES2015+ de JS, asi que voy a usar Babel por lo que instalamos un par de paquetes en las dependencias de desarrollo.

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
Despues volveremos a retocar el arhivo pero dejo un vistazo basico, no es la versión final.

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

<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/server-directorio.png">

Aca tendriamos la estructura basica del directorio.

## Armar los Schemas

Para armar los Schemas podemos elegir 2 maneras.

1. hacerlo todo en un archivo javascript.
2. dividir la sintaxis propia de graphQL en un archivo y la parte javascript en otro.

No son tan diferentes al final.

### 1. Todo en JS

Vamos a necesitar una función de graphQL asi que la importamos

`import { buildSchema } from 'graphql';`

Con esto vamos a hacer que los Schemas esten listos para ser usados.

Para escribir los Schemas creamos una variable, llamemosla `types`, su contenido va a ser sintaxis de GrahpQL, pero para que funciona lo vamos a encerrar usando el acento grave.

```
const types= `
    type Query = {
        buscar(id: ID): String
    }
`;
```

En nuestro caso necesitamos modelar los Tipos que se van a usar.

Necesitamos un **MES**, que tenga un `id`, un `nombre`, cantidad de `dias` , y una lista de quienes cumplen años, digamos un array `cumple`. Podemos NO, debemos modelar los datos que tenemos en `data/data.js`. Entonces 

* `id: ID`
* `nombre: String`
* `dias: Int`
* `cumple: [String]`

También necesitamos modelar los Query y Mutation. Por ahora no es neceario poner como se consigue los resultados sino que necesita y que devuelve, ademas del nombre de las funciones.

Para los query necesitamos:

* `mes(id: ID, nombre: String, dias: Int): [Mes]` / no necesitamos parametros obligatorios porque se podria buscar por unos o por otros, por ejemplo buscar el nombre del mes para saber el ID, o buscar cuales meses tienen 30 dias y por esta razón lo mejor es que devuelva una array de *Mes*

Para el Mutation necesitamos agregar nombres de Personas a la lista de los meses:

* `cumple(id: ID!, nombre: String!): Mes` / en este caso el ID del mes y tiene que ser obligatorio sino no sabemos donde agregar, el nombre de la persona también obligatorio sino no tenemos que guardar.

Ya tenemos armado nuestros Schemas, no es complicado, pero podemos hacerlo mas complejo si tenemos mas funciones, con mas campos, anidados, y otro monton de cosas más, pero no es dificil, solo tenemos que tener en cuenta que tipo de datos usamos, y lo que vamos a hacer.

Por ultimo necesitamos convertir este texto a datos utiles y para usamos la función que importamos.

`export const schemaConJS = buildSchema(types);`

Y si lo exportamos para que pueda ser usado en el server.

### 2. Dividimos entre JS y GRAPHQL

Para este caso usamos un archivo adicional cuya extensión puede ser `.graphql` o `.gql`, en facebook usan la primera pero muchos usan la segunda, es lo mismo.

La diferencia con el caso anterior es que en vez de encerrar al codigo en GraphQL entre acentos graves, lo ponemos en este nuevo archivo. Pero lo necesitamos llevar al archivo javascript, como lo hacemos?

`import { importSchema } from 'graphql-import';`

Esa función nos va a ayudar. 

`const types2 = importSchema(grahpql/schemas.graphql);`

Creamos una variable, importamos el archivo, no importa donde este llamada la función el parametro debe ser la **ruta relativa hacia el archivo desde el root de la app**. 

Finalmente usamos y exportamos

`export const schemaConGQL = buildSchema(types2);`

Pueden ver los archivos 
* [schemas.js](https://github.com/gastonpereyra/Apuntes_GraphQL/tree/master/src/schemas.graphql)
* [schemas.graphql](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/src/schemas.js)

## Avanzando

Falta hacer los resolvers para que esto funcione, e iniciar GraphiQL para poder hacer las consultas, vamos por eso..

- - - -
[<kbd>Volver</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/playground_mutation.md)
[<kbd>Inicio</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/README.md)
[<kbd>Siguiente</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/contenido/server_resolvers.md)
