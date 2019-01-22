# Wrapping REST API

<img src="https://cdn-images-1.medium.com/max/2560/1*feOd6UwyHF71rRmRtj_B7g.png" width="900">

La imagen explica mucho, con una API desarrollada en Graphql podemos conectar a otras aunque sean REST.

Incluso podriamos cambiar la REST por otra, y si mantenemos los Schemas, los tipos de datos que pedimos y devolvemos en el front ni se enteran.

Podriamos usar muchas para recolectar diferente información y devolverla toda junta, creando la ilusión que siempre fue asi.

## Como lo hacemos.

* Logicamente tenemos que tener los endpoints de la REST.
* Tenemos que saber que tipo de datos nos devuelven.
* Modelamos los Schemas
* Los Resolver hacen los pedidos a la API
* El Front los usa.

Aca podemos elegir un par de caminos, modelamos los Schemas tal cual los datos que vienen desde la REST, o los modelamos como creemos que nos va a ser mas util.

Si decidimos modelarlos tal cual, los resolvers solo van a dedicarse a hacer un Fetch, filtrar, mapear o encontrar valores segun los query y mutation, podemos devolver el valor sin preocuparnos mucho.

En cambio si lo modelamos como queremos es probable que en los resolvers tengamos que agregar cosas para que al devolver los valores esten en el formato correcto. De lo contrario saldria `null`.

## Por ejemplo

REST-1 endpoints: 
* `http://www.esSci-fi.com/ejemplo/libros` - devuelve una lista de libros sobre Ciencia Ficción, no tiene para poner parametros o refinar la busqueda.

Y deuvelve cosas asi:

```
{[
  { "titulo": "Un viaje a las Estrellas", "autor": "John John", "cant_paginas": 342 },
  { "titulo": "Un viaje a las Estrellas 2", "autor": "John John", "cant_paginas": 152 },
  { "titulo": "Planeta Viviente", "autor": "Paul Parker", "cant_paginas": 1342 },
  { "titulo": "El Multiverso", "autor": "Lou Lang", "cant_paginas": 290 },
  { "titulo": "A Otra Galaxia", "autor": "Evelyn Smith", "cant_paginas": 222 },
  { "titulo": "Guerras cosmicas", "autor": "John John", "cant_paginas": 92 },
  { "titulo": "Mi Alien es un Clon", "autor": "Evelyn Smith", "cant_paginas": 442 }
]}
```

* `http://www.esSci-fi.com/ejemplo/tapas/:titulo` - a traves del titulo de la obra devuelve las tapas que tuvo la obra


```
{[
  { "url": "http://www.esSci-fi.com/ejemplo/tapas/image/54654.png"},
  { "url": "http://www.esSci-fi.com/ejemplo/tapas/image/54655.png"}
]}
```

REST-2 endpoint:
* `http://www.esLibro/venta/:nombre` - devuelve una lista de comercios que tienen a la venta un libro


```
{[
  { "local": "Amazonia", "direccion": "Siempre viva 555"},
  { "local": "Evai", "direccion": "False 111"},
  { "local": "La Atenas", "direccion": "Baker 221"}
]}
```

Podriamos armar un Schema algo asi

```graphql
type Libro {
  nombre: String
  autor: String
  cant_paginas: Int
  tapas: [String]
  locales: [Local]
}
type Local {
  nombre: String
  direccion: String
}
type Query {
  getLibros(autor: String, pag_min: Int, pag_max: Int): [Libros]
  getLibro(nombre: String)
}
```

Y y a estariamos ofreciendo mas datos en la busqueda de los libros, ademas de poder filtrarlos por el mismo autor o segun la cantidad de paginas.

Y los resolvers 

```javascript
const resolvers= {
  Libro: {
    tapas: (root) => {
       return fetch('http://www.esSci-fi.com/ejemplo/tapas/'+root.nombre)
        .then(res => res.json())
        .then(tapas => tapas.map( tapa => tapa.url));
    },
    locales: (root) => {
      return fetch('http://www.esLibro/venta/'+root.nombre)
        .then(res => res.json())
        .then(locales => locales.map( local => ({"nombre": local.local, local.direccion })));
    }
  },
  Query: {
    getLibros: (root,{autor, pag_min, pag_max}) => {
      // hago el fetch y filtro si corresponde
      return libros;
    },
    getLibro: (root,{nombre}) => {
      return fetch('http://www.esSci-fi.com/ejemplo/libros')
        .then(res => res.json())
        .then(libros => libros.find(libro => libro.name === nombre);
    }
  }
}
```

En fin. Es un concepto simple que vale la pena probar. 

- - - -

[<kbd>Inicio</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/README.md)
[<kbd>Siguiente</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/server_resolvers.md)
[<kbd>Siguiente</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/manejando-el-front.md)
