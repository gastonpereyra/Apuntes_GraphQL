# Resolvers

Los resolvers son las funciones para resolver los query y mutations. PERO también resuelven campos dentro de los tipos definidos en los Schemas.

## Identificando los Resolvers

Supongamos que tenemos este Schema

```graphql
type Biblioteca {
  id: ID
  nombre: String
  direccion: String
  libros(id: ID, count: Int, offset: Int): [Libro]
}

type Libro {
  id: ID
  titulo: String
  cant_paginas: Int
}

type Query {
  mostrarBibliotecas: [Biblioteca]
  buscarBiblioteca(id: ID): Biblioteca
}
```
A la hora de hacer los Resolvers podemos identificar facil, no hay Mutations, resolvemos los Query
* `mostrarBibliotecas`
* `buscarBiblioteca`

Pero también tendriamos que hacer:
* `libros`

Para entenderlo `libros` es un campo de Biblioteca, y a la vez es una función.
Si no hacemos el Resolver de `libros`, al ejecutar el query de `mostrarBibliotecas` va a mostrar todo el array, "espera, eso es lo que queremos" diran, pero aunque le pongamos los parametros que indicamos lo va a seguir haciendo ya que no sabe que hacer con ellos.

### Otro Caso

Supongamos que los datos que obtenemos vienen en el siguiente formato:

```json
{
  "id": "0as532357d59b0ds",
  "nombre": "Nacional",
  "direccion": "Agüero 2502, CABA",
  "libros": {
    "0": {
      "id": "l0as5d8r9d6r6r4A",
      "titulo": "Scrum y XP desde las Trincheras",
      "cant_paginas": 122
    },
    "1": {
      "id": "l1as2W8r9d6Z2r1A",
      "titulo": "El Silmarillion",
      "cant_paginas": 448
    },
    "// mas libros"
  }
},
"// mas Bibliotecas"
```

En este caso tenemos un conflicto entre lo que modelamos en el *Schema* y lo que devolvemos, libros devuelve un array y tenemos un objeto. En estos casos podemos usar un *Resolver* para convertir ese objeto en array.

## Pero qué es un Resolver?

*PARA! ya lo dijiste!*

Dije, pero no dije.. o mas bien, no dije todo, si siguieron el ejemplo de CumpleQL (o si lo van hacer) ven que usó unos resolvers muy simple, y hagó una aclaración que existen otras formas, esas otras formas involucran mas propiedades que poseen los resolvers.

Un resolver tiene un formato (en cualquier lenguaje de programación) masomenos asi:

<img src="https://cdn-images-1.medium.com/max/800/1*IdRm05pv-cT2rmBY6omFhw.png">

Es decir estan formados por:

* a que ambito pertenece, en la imagen `Event`
* el nombre del campo/función, en la imagen `title`
* los parametros que recibe, `(root, args, context, info)`
* como se resuelve.
* Y que devuelve algo: `null`, `promise`, un valor simple (como un `Int`), un array (o uno vació), un objeto definido.

### Parametros

Esos 4 parametros se pasan siempre de alguna forma.
Si miran muchos ejemplos alrededor de internet van a encontrarse con `root` por todos lados..

La descripción de cada uno de ellos es masomenos asi:

* `root`: resultados que le pasa el "padre" osea desde donde se ejecuta. Ejemplo mas adelante
* `args`: los parametros en la descripción del schema
* `context`: es un objeto que usan todos los resolvers, puede ir cambiando. Para pasar info entre ellos.
* `info`: información especifica del campo relvante para el query.

### Aclaración

Talvés se dieron cuenta, talvés no. 
Pero podemos usar resolvers para cada campo de cada tipo definido en los schemas, aun si son simples tipos de datos como un String y no tengan ningun parametro que resolver.

De hecho, esto pasa, son **Default Resolvers** 

<img src="https://cdn-images-1.medium.com/max/800/1*x-1OE_wqncx22oJaW3pRkg.png">

No hace falta definirlos pero es bueno saber hacerlo por si es necesario, por ejemplo para uno de los casos anteriores ("Otro caso").

## Usando graphql-express

En CumpleQL usamos el middleware de *Express* llamado [`graphql-express`](https://github.com/graphql/express-graphql) y eso nos facilito las cosas, usamos resolvers de manera simple y sin preocuparnos de tantas cosas y funcionaba.

El formato era algo asi:

```javascript
const resolvers = {
  mostrarBibliotecas: () => {
    const bibliotecas= [];
    // codigo para obtenerlas
    return bibliotacas;
  },
  buscarBiblioteca: ({id}) => {
    // codigo para obtener las bibliotecas
    return bibliotecas.find( b => b.id === id );
  },
  // etc..
}
```
Y luego lo "enchufabamos" a Express

```javascript
const express = require('express');
const graphqlHTTP = require('express-graphql');

// Traemos los schemas y resolvers de otros archivos

const app = express();

app.use('/playground', graphqlHTTP({
  schemas: schemas,
  rootValue: resolvers
  graphiql: true
});

// configuramos lo que falte

app.listen(3000);

// terminamos de armar el server y lo ponemos a escuchar pedidos

```

De esa manera nos olvidamos de pasar el `root` en el resolver y los otros parametras, el middleware se encargaba de todo eso..

Si bien es simple de usar y para aprender nos fue util probablemente necesitemos algo mas.

## En otros middleware

Si vamos a usar otros modulos,Frameworks como Apollo, Relay o Yoga (por nombrar populares), hay que hacer unos ligeros cambios en como creamos los resolvers, nada tan complejo tampoco.

Por ejemplo trasnformarlos asi:

```javascript
const resolvers= {
  Query: {
    mostrarBibliotecas: () => {
    const bibliotecas= [];
    // codigo para obtenerlas
    return bibliotacas;
    },
    buscarBiblioteca: (root, {id}) => {
      // codigo para obtener las bibliotecas
      return bibliotecas.find( b => b.id === id );
    }
  },
  Mutation: {
    // En este caso no tenemos
  },
  Biblioteca: {
    name: (root,args,context,info) => root.name,
    libros: ({libros},{id,count,offset}) => {
       const arrayLibros= [];
      // formateaos el campo libros a un array
      // operamos con los parametros en los casos que sea necesario
      return arrayLibros;
    }
  }
};
```

La mayor diferencia es que en ves de poner las funciones sueltas, se agrupan segun de donde vengan.

A tener en cuenta si se nos pasa un parametro como en `buscarBiblitoteca(id)` hay que pasar primero `root` (algunos también lo llaman `parent`).

En `Biblioteca` pase `name`, solo a modo de ejemplo, no hace falta, ni hace falta pasarle todos los parametras es solo una manera de mostrar que se puede hacer.
En libros, en vez de `root`, que es un objecto le extraje el campo que me interesa que es el campo libros (Que por "Otro Caso") sabemos que es un objeto y lo convertimos a array.

### Context

Para usar context, no es complicado:

```javascript

const resolvers= {
  Query: {
    buscar: (root,{id},context) => {
      const item = getItem(id);
      context.item = item;
      return item.nombre;
    },
    haceAlgo: (root,args,context) => {
      return context.item.edad*10;
    }
  }
}

```

## Conectando al Middleware

No es tan distinto a lo hecho para `graphql-express`, en general 
* schemas van a `typeDefs`
* resolvers van a `resolvers`

Para entenderlo usemos uno de los modulos del Framework Apollo, que es de los mas populares, y otros son parecidos.

```javascript
import express from 'express'; // Modulo de Express
import { ApolloServer } from 'apollo-server-express'; // Modulo para Apollo
import { typeDefs } from './api/schemas'; // Schemas
import { resolvers } from './api/resolvers'; // Resolvers

// Iniciar Express
const app = express();

// Iniciar el Server de GraphQL
const server = new ApolloServer({
  typeDefs: typeDefs, 
  resolvers: resolvers});
  
server.applyMiddleware({app}); // Conectar Apollo con Express

// Listo para Escuchar Request
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
```

Y asi se abre un endpoint en `/graphql` para usarlo.
Dicho sea de paso Apollo ofrece una herramiento similar a Graphiql.

## Más

Hay más cuestiones, como problemas que surgen al usar promises, soluciones aportados por los frameworks, y demás, pero eso lo dejamos para más adelante

- - - -
[<kbd>Inicio</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/README.md)
[<kbd>Query</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/playground_query.md)
[<kbd>Mutation</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/playground_mutation.md)
[<kbd>Schema</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/schemas.md.md)
