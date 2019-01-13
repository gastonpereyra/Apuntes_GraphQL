# Mutation
Para seguir practicando la sintaxis de __GraphQL__ en este caso la parte de __Mutation__.
Para esto voy a usar otro playground, que simula un sistema de Login de usuarios, se pueden registrar, logear, y actualizar, y también se pueden crear simples TO-DO.
Por supuesto también se pueden hacer consultas. Y como en el anterior los Schemas y Resolvers ya estan construidos.
Algo interesante, usa JWT (JSON Web Token).
Este Playground es [FakerQL](https://fakerql.com/), pueden mirar su [Repo Aqui](https://github.com/notrab/fakerql) para "jugar" con el resto de las cosas que ofrece.

## Conociendo el Editor
<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/GQL_P2_00.png" width="900">

A diferencia del anterior este tiene muchas más cosas, vamos a describir lo que vamos a usar

* Arriba : 
  - Derecha: Pestañas, se pueden tener varias pestañas con diferentes codigos funcionand
  - Izquierda: Icono de "Rueda", son Opciones, por ejemplo cambiar entre Tema Oscuro o Claro.
  
* Abajo:
  - Izquierda: un Editor para poner las variables de las Query, y también se pueden configurar los HTTP Header.
  
* Centro:
  - Izquierda: El editor de código.  
  - Centro: Boton de Play para ejecutar el código
  - Derecha: El visor de Resultados.
  - Más a la Derecha: Boton de "Schemas", donde esta la documentación.

## Query
<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/GQL_P2_02.png" width="900">

Solo para mostrar metodos que solo son para Query y refrescar la memoria.
En este caso, los "Products" y "Posts" tienen 4 metodos, 2 cada uno, para hacer busquedas.

* Products 
  - `Product(id: //id)`: Para mostrar los datos de UN producto
  - `allProducts` : Para mostrar los datos de todos los productos.
  
* Posts 
  - `Post(id: //id)`: Para mostrar los datos de UN post
  - `allPosts` : Para mostrar los datos de todos los post.
  
Código:
```
{
  allProducts(count: 2) {
    name
    price
    
  }
  allPosts(count: 2){
    title
    author {
      firstName
      lastName
    }
  }
}
```

## Register
<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/GQL_P2_01.png" width="900">

Este Playground nos permite "jugar" a un sistema de Login de Usuarios. Entonces para hacer __Mutation__ vamos a usar este simulacro.
Como todo sistema de Usuarios, empezamos con registrarnos y para esto vamos a usar el método `Register`

* Register
  - `email` <kbd>parametro</kbd> <kbd>necesario</kbd> <kbd>String</kbd>
  - `password` <kbd>parametro</kbd> <kbd>necesario</kbd> <kbd>String</kbd>
  - `expiresIn` <kbd>parametro</kbd> <kbd>opcional</kbd> <kbd>String</kbd> / en teoria es lo que dura el token ej: `"24hs"`
  - `token` <kbd>data</kbd> <kbd>necesario</kbd> <kbd>String</kbd> / es un JWT necesario para mantener la sesión.
  
Para hacer un __Mutation__ la sintaxis es similar al de un __Query__ con la diferencia que hay que poner al principio la palabra `mutation`.
A diferencia de __Query__ donde la palabra `query` era opcional (o necesaria si ponemos un nombre para usar variables), aca hay que usar `mutation` si o si, de otra forma piensa que es un __Query__.

Código:
```
mutation {
  register(email: "gaston@pereyra.com.ar", password: "podemosAprender2") {
    token
  }
}
```

## Login
<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/GQL_P2_03.png" width="900">

Ya registrados podemos Logearnos, usamos `Login`

* Login
  - `email` <kbd>parametro</kbd> <kbd>necesario</kbd> <kbd>String</kbd>
  - `password` <kbd>parametro</kbd> <kbd>necesario</kbd> <kbd>String</kbd>
  - `expiresIn` <kbd>parametro</kbd> <kbd>opcional</kbd> <kbd>String</kbd> / en teoria es lo que dura el token ej: `"24hs"`
  - `token` <kbd>data</kbd> <kbd>necesario</kbd> <kbd>String</kbd> / es un JWT necesario para mantener la sesión.

Igual que `Register`.

Ahora tenemos 2 formas de conseguir el JWT y podemos seguir usandolo.

Código:
```
mutation {
  login(email:"gaston@pereyra.com.ar", password:"podemosAprender2") {
    token
  }
}
```

## JWT, qué ?
<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/GQL_P2_04.png" width="900">

`JWT`: JSON Web Token
Es un tipo de Token muy util para las sesiones en la Web y mantener cierto grado de seguridad entre Cliente y Servidor.

Sin este Token este playground no permite realizar algunas operaciones, por ejemplo el __Query__ `me`. Probemos sin usar el Token obtenido en los pasos previos.

Al intenter usarlo nos da error. Hay que configurarlo en los HTTP Header

Código:
```
{
  me {
    id
    firstName
  }
}
```

## JWT y HTTP Header
<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/GQL_P2_05.png" width="900">

Entonces configuremos el HTTP Header, para eso, a la izquierda, abajo, abrimos el editor y ponemos

HTTP Header:
```
{
	"Authorization" : "Bearer TOKEN"
}
```
Cambiar TOKEN por el Token obtenido

Probamos otra vez, y obtenemos un resultado positivo. PERO, vemos porque es un simulacro, porque no guardó nuestro registro.

## Actualicemos
<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/GQL_P2_06.png" width="900">.

Finalmente usemos un Update, aunque sepamos que esto solo se guarda temporalmente en memoria.
Vamos a necesitar el Token en los Headers, lo mantenemos.
Nos fijamos en los Schemas, podemos usar `updateUser`,  vemos que solo necesitamos un id, y por supuesto los cambios a modificar. Nos va a devolver un objeto User, y nosotros elegimos que datos vamos a obtener, en este caso solo los que modificamos.

* updateUser
  - `password` <kbd>parametro</kbd> <kbd>necesario</kbd> <kbd>String</kbd>
  - `email` <kbd>parametro</kbd> <kbd>opcional</kbd> <kbd>String</kbd>
  - `firstName` <kbd>parametro</kbd> <kbd>opcional</kbd> <kbd>String</kbd>
  - `lastName` <kbd>parametro</kbd> <kbd>opcional</kbd> <kbd>String</kbd>
  - `user` <kbd>data</kbd> <kbd>necesario</kbd> <kbd>User</kbd>
  
* User
  - `id`: <kbd>necesario</kbd> <kbd>ID</kbd>
  - `firstName`: <kbd>necesario</kbd> <kbd>String</kbd>
  - `lastName`: <kbd>necesario</kbd> <kbd>String</kbd>
  - `email`: <kbd>necesario</kbd> <kbd>String</kbd>
  - `avatar`: <kbd>opcional</kbd> <kbd>String</kbd>

Código:
```
mutation {
  updateUser(id: "cjqv5y2bp00ht2r106mg3hkui", firstName: "Gaston", lastName:"Pereyra") {
    id
    firstName
    lastName
  }
}
```

## Más ?

Por supuesto este playground tiene más cosas, como buscar los usuarios, agregar TO-DO y buscarlos. Pruebenlo.
Pero vemos que usar __Mutation__ no es para nada dificil y es muy similar a usar un __Query__ o incluso mas simple.

- - - -
[<kbd>Volver</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/playground_query.md)
[<kbd>Inicio</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/README.md)
[<kbd>Siguiente</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/contenido/)
