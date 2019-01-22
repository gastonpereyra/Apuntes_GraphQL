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

No hace falta definirlos pero es bueno saber hacerlo por si es necesario, por ejemplo para uno de los casos anteriores ( "Otro caso" )



