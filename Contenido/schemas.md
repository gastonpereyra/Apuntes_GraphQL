# Schemas

<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/schemas.png" width="900">

En los Schemas es el lugar donde se definen los objectos y funciones que se van a usar.

## Tipos

Los Schemas son tipados, es decir necesitan que se aclare que tipos de datos lo forman, y hay varios

### Escalares

* `Int`: 32‐bit integer
* `Float`: Signed double-precision floating-point value
* `String`: UTF‐8 character sequence
* `Boolean`: true o false
* `ID` (serialized as String): deber un identificar unico

### Array

Son el clasico Array de todos los lenguajes

### Enum

Es una lista de valores predefinidos.

### Objetos

Son un grupo de campos (junto a sus tipos) agrupados bajo un mismo nombre.

### Query

Son un grupo de funciones que posibilitan la busqueda

### Mutation

Son un grupo de funciones que posibilitan la edición

## Declaración

Para declarar los Schemas se usa la palabra `type` excepto para los Enum que se usa `enum`, seguido del nombre..
Para los campos, `nombre: tipo`

```
enum Un_Enum {
  ENUM1
  ENUM2
  ENUMN
}
```

Se pueden anidar los tipos

```
type Un_Objeto {
  campo0: ID
  campo1: String
  campo2: Int
  campo3: Float
  campo4: Boolean
  campo5: Un_Enum
}

type Otro_Objeto {
  id: ID
  campoN: String
  campoM: Int
  un_array: [Un_Objeto]
}
```

Una vez definidos los tipos de datos que se van a usar podemos definir las funciones que vamos a usar, , usar `!` hace que el campo sea obligatorio.
El formato seria el siguiente `nombre(parametro: tipo): tipo`

```
type Query {
  buscar(id: ID!): Un_Objeto
  encontrar(campo: String, otroCampo: Int): [Otro_Objeto]
}
```
```
type Mutation {
  agregar(id: ID!): Otro_Objeto
}
```

## Descripción

Es posible agregar en el código una descripción, que puede ser usado por ejemplo en una interfaz grafica para mostrar información adicional, previo a la definición de un tipo se pone:

```
""" Descripcion del Objeto """
type Algo { 
  """ descripcion del campo """
  alguito: String
 }
```

## Comentarios

Para añadir comentarios en el código se usa `#` 

## Otros

Existen otrto tipo, y variantes
* Interfaces
* Union
* Input

Vale destacar que los Input se declaran usando `input` en vez de `type` y sirven para pasar objectos como parametros en las funciones.

También que los campos de los objetos pueden tener parametros.

Para ampliar sobre esto vean la documentación


- - - -
[<kbd>Volver</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/server_schemas.md)
[<kbd>Inicio</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/README.md)

