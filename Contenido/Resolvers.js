# Resolvers

Los resolvers son las funciones para resolver los query y mutations. PERO también resuelven campos dentro de los tipos definidos en los Schemas.

Supongamos que tenemos este Schema

```
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
A la hora de hacer los Resolvers podemos identificar facil:
* `mostrarBibliotecas`
* `buscarBiblioteca`

Pero también tendriamos que hacer:
* `libros`

## 1. 
