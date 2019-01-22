# A Probar el Server

<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/server_marcha.png" width="900">

## Resolvers

Esta parte no tiene muchos misterios, por ahora.
Simplemente se trata de armar las funciones con lenguaje propio del server.
Hay que respetar el nombre de las funciones y el tipo de datos que devuelven. 
Si tuvieramos una Base de datos aca es el lugar donde nos conectamos a ella.

En nuestra pequeña app, como usamos JS englobamos todas las funciones en un objeto.

```javascript
const resolvers = {
    // codigo
};
```

Tenemos 2 funciones para hacer `mes(id,nombre,dias):[Mes]` y `cumple(id,nombre):Mes`. Como es JS usemos arrow functions.
El valor a devolver tiene que estar en JSON.

```javascript
const resolvers = {
   mes: (id, nombre, dias) => {
        // codigo
        return {
          "id": id,
          "nombre": nombre,
          "dias": dias
        };
   }
};
```

Esto no va a funcionar por 2 cuestiones, la primera tenemos que devolver un array, falta devolver la lista de los cumpleañeros.
Pero lo importante, de la forma en la que lo vamos a usar los parametros vienen en forma de objeto por lo que hay que cambiar esa parte.

```javascript
import { meses } from '../data/data';

const resolvers = {
   mes: ({id, nombre, dias}) => {
        const m= meses.filter( 
            // codigo para filtrar los datos 
        );
        
        return (m.map( mes => ({
            "id": mes.id,
            "nombre": mes.nombre,
            "dias": mes.dias,
            "cumple": mes.cumple
            });
        };
   }
};
```

Ahora si.. resolvemos de forma similar la otra función.

Si no se les ocurre como, Pueden ver el Archivo completo -> [ACA](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/src/resolvers.js)

### Aclaración

Si vamos a usar Apollo, Relay y otros esta parte va a tener modificaciones, especialmente en la parte de los parametros.

Para saber mas sobre Resolvers:

* [Resolvers](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/resolvers.md)

## GraphiQL

Ya tenemos Schemas, tenemos Resolvers, nos falta probarlo.
Para esto hay que configurar el `server.js`.

Necesitamos incorporar el middleware para express
`import graphqlHTTP from 'express-graphql'; `

También vamos a necesitar los Schemas y los Resolvers
`import { schemasConJS, schemasConGQL } from './graphql/schemas';`
`import { resolvers } from './graphql/resolvers';`

Y simplemente configuramos la ruta con el middleware

```javascript

app.use('/playground',graphqlHTTP({
    schema: schemasConGQL,             // Schema a usar
    rootValue: resolvers,    // conectar con el resolver
    graphiql: true      // que se pueda usar GraphiQL
}))
```

Es bastante intuitivo, los schemas van en `schema`, en `rootValue` van los resolvers y activamos `graphiql`.

Pueden ver el archivo completo -> [Aca](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/src/server.js)

## Probemos

Antes de probarlo, pueden iniciar la parte de archivos estaticos y publicos de Express para el ingreso a un `index.hmtl`, por ejemplo, algun link para que vayan hacia el path de GraphiQl.

Si estan en sus maquinas inicien con 

`npm start` 

Y vayan al [browser](http://localhost:3000)

Si estan en Glitch, y no hay errores vayan a `Show`

En mi caso me quedó algo asi:

<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/CumpleQL.png" width="900">

Si apreto el boton "Quiero Probarlo" me redirige hacia GraphiQL

<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/server_graphiql.png" width="900">

Funciona.. pero hará las consultas?

Se los dejó a uds.. creanme a mi me resulta..

PD: Solo como un dato curioso Graphical esta hecho en React, y no en una versión nueva

## Fork ? Remix ?

Por ultimo les dejo el repo en Github si quieren darle un Fork o agregar algo

<https://github.com/gastonpereyra/cumpleQL>

El código esta en la rama 'glitch' pero pueden entrar via GitPages

<https://gastonpereyra.github.io/cumpleQL/>

En Glitch pueden darle Remix

<https://glitch.com/~cumple-graphql>

o entrar a mirar <https://cumple-graphql.glitch.me/>

# Gracias!

- - - -

[<kbd>Inicio</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/README.md)
[<kbd>Siguiente</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/server_schemas.md)
[<kbd>Siguiente</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/wrapping.md)
