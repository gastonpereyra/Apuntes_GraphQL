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

## Que es un Resolver?

PARA! ya lo dijiste, pero no dije todo, si siguieron el ejemplo de CumpleQL (o si lo van hacer) cuando hablo de los Resolvers evitó decir algo y lo pongo como Aclaración, lo voy a ampliar aca.

Un resolver tiene un formato (en cualquier lenguaje de programación) masomenos asi:

<img src="https://cdn-images-1.medium.com/max/800/1*x-1OE_wqncx22oJaW3pRkg.png">
