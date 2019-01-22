# Query
Para practicar la sintaxis de los Query, voy a usar [GraphQLHub](https://www.graphqlhub.com/playground), un playground que tiene __Schemas__ y __Resolver__ ya definidos, y cuenta con varias __API__
## API
Este Playground cuenta con las siguientes API para realizar __Query__
* Hacker News
* Twitter
* GitHub
* Reddit
* Giphy
También cuenta con opciones propias y para __Mutation__ pero lo encuentro poco claro, y además solo lo carga en memoria no en alguna Base de Datos.
## Conociendo el Editor
<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/GQL_02.png" width="900">

Consta de:

* Arriba-Derecha : Botón de "Docs", donde esta la documentación de las API que podemos usar, los operadores, tipos de datos para parametros o para buscar.
* Arriba-Izquierda : Botón de Play para ejecutar el codigo.
* Izquierda : editores de texto para escribir el código en la parte superior y en la inferior el editor para pasar variables en formato JSON.
* Derecha: un visor con la info requerida o los errores.

## Primer Query
<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/GQL_03.png" width="900">

[En el Editor](https://www.graphqlhub.com/playground?query=query%20%7B%0A%20%20twitter%20%7B%0A%20%20%20%20search(q%3A%22Podemos%20Aprender%22)%20%7B%0A%20%20%20%20%20%20text%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&variables=null&fbclid=IwAR39yJ-y9y25S0_w1FRTyQLjqbIC-oAsMEqm7a7M-xxvg0HpcwNWcAkuF10)

__Importante__: Podemos siempre chequear que tipo de datos esperar y pedir, que metodos usar, y todo lo que necesitemos haciendo click en __DOCS__

1) Empecemos a escribir un query 
```
query { 
  // código
}
```
La palabra "query" es opcional.

2) Ponemos que API vamos a usar,
```
query { 
  twitter { 
    // código
    } 
 }
 ```
3) que operador vamos a usar, y sus parametros -> `nombreDelOperador ( nombreDelParametro : DATO_A_BUSCAR )`
```
query { 
  twitter { 
    search(q: "Podemos Aprender") { 
      // código
    } 
  } 
}
```
4) que tipo de datos esperamos recibir
```
query { 
  twitter { 
    search(q: "Podemos Aprender") { 
      text
    } 
  } 
}
```
5) Click en el boton de "Play". Y vemos a la derecha los resultados.
Sigamos.

## Con Más Campos
<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/GQL_04.png" width="900">

[En el Editor](https://www.graphqlhub.com/playground?query=query%20%7B%0A%20%20twitter%20%7B%0A%20%20%20%20search(q%3A%22GraphQl%22)%20%7B%0A%20%20%20%20%20%20text%0A%20%20%20%20%20%20retweet_count%0A%20%20%20%20%20%20id%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&variables=null&fbclid=IwAR0kNo3txWQjAdvLRyTaA718Nt4vWBmY-ZjSS4PhlAH__3gEgYrb4kouHec)

Hagamos otra consulta con mas campos, agreguemos que nos devuelva el ID, y los cantidad de RT.

## Usando más Parametros
<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/GQL_05.png" width="900">

[En el Editor](https://www.graphqlhub.com/playground?query=%7B%0A%20%20twitter%20%7B%0A%20%20%20%20search(q%3A%22GraphQl%22%2C%20count%3A%205)%20%7B%0A%20%20%20%20%20%20text%0A%20%20%20%20%20%20retweet_count%0A%20%20%20%20%20%20id%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&variables=null&fbclid=IwAR2JgPronr5cd44Klv5X9TRK-3PmM0dq6KUZ930CIt87qfa7mefQc3dGqZg)

Probemos con usar mas parametros, por ejemplo limitando a solo 5 tweets, y ya que "query" es opcional saquemoslo

## Campos Anidados
<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/GQL_06.png" width="900">

[En el Editor](https://www.graphqlhub.com/playground?query=%7B%0A%20%20twitter%20%7B%0A%20%20%20%20search(q%3A%22Javascript%22%2C%20count%3A%203)%20%7B%0A%20%20%20%20%20%20text%0A%20%20%20%20%20%20retweet_count%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20user%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20screen_name%0A%20%20%20%20%20%20%20%20url%20%20%20%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&variables=null&fbclid=IwAR3NiGzez5iE0yFefNNysZx30jIkRCeKkXZhbBXyLueDRzzkGyJUFkyh-_c)

Agreguemos otro campo mas el usuario, miramos la Documentación en "Docs", y vemos que es un tipo de dato objeto, entonces vamos a tener que pedir datos extras, pedimas un par.

## Alias
<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/GQL_07.png" width="900">

[En el Editor](https://www.graphqlhub.com/playground?query=%7B%0A%20%20twitter%20%7B%0A%20%20%20%20PythonTweets%3Asearch(q%3A%22Pyhton%22%2C%20count%3A%202)%20%7B%0A%20%20%20%20%20%20text%0A%20%20%20%20%20%20retweet_count%0A%20%20%20%20%20%20user%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&variables=null&fbclid=IwAR2F7B1-A31e8wF8z6xTX6vyOOGFdLWhaT-RSN5B1gisvZmV5CEE_dTgMbc)

Podemos ponerles "ALIAS" a las busquedas asi aparecen Etiquetadas asi

## Multiples Busquedas
<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/GQL_08.png" width="900">

[En el Editor](https://www.graphqlhub.com/playground?query=%7B%0A%20%20twitter%20%7B%0A%20%20%20%20PythonTweets%3A%20search(q%3A%22Pyhton%22%2C%20count%3A%202)%20%7B%0A%20%20%20%20%20%20text%0A%20%20%20%20%20%20retweet_count%0A%20%20%20%20%20%20user%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20RubyTweets%3A%20search(q%3A%22Ruby%22%2C%20count%3A%202)%20%7B%0A%20%20%20%20%20%20text%0A%20%20%20%20%20%20retweet_count%0A%20%20%20%20%20%20user%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&variables=null&fbclid=IwAR1C8Lms0wApiAiSF56U_AgD8IzeVWCwG4SMvI0V0w6iqROs6tEMW2ZmoLs)

Gracias a los "ALIAS" podemos realizar varias busquedas en una misma llamada.
De otra forma tendriamos un error.

## Fragments
<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/GQL_09.png" width="900">

[En el Editor](https://www.graphqlhub.com/playground?query=%7B%0A%20%20twitter%20%7B%0A%20%20%20%20PythonTweets%3A%20search(q%3A%22Pyhton%22%2C%20count%3A%201)%20%7B%0A%20%20%20%20%20%20...tuit%0A%20%20%20%20%7D%0A%20%20%20%20RubyTweets%3A%20search(q%3A%22Ruby%22%2C%20count%3A%202)%20%7B%0A%20%20%20%20%20%20...tuit%0A%20%20%20%20%20%20id%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Afragment%20tuit%20on%20Tweet%20%7B%0A%20%20%09%09text%0A%20%20%20%20%20%20retweet_count%0A%20%20%20%20%20%20user%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%7D&variables=null&fbclid=IwAR2xA4i5EkpBuyYkv0zFcOa_1fTAyBtqfKAj85x3tlHZy9FzlShly4z0bGg)

Ya que estamos realizando varias busquedas en una misma llamada vemos que repetimos el mismo código en cada busqueda, para no tener que repetirlo (DRY, don't repeat yourself), podemos usar FRAGMENTS.
Esto nos va a permitir crear una suerte de template de datos que queremos obtener que van a ser comunes para diferentes tipos de busqueda.

```
fragment NOMBRE_FRAGMENT on OBJETO {
  campo1
  campo2
  campoN
}
```

OBJETO esta definido en previamente en la API (nos fijamos en los DOCS como se llama)
Y dentro de la busqueda, en vez de todos los campos ponemos

```
  FUNCION {
    ...NOMBRE_FRAGMENT
  }
```

## Nombrar Queries y Variables
<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/GQL_10.png" width="900">

[En el Editor](https://www.graphqlhub.com/playground?query=query%20BuscarTweets(%24palabra%3A%20String!%2C%20%24cantidad%3A%20Int)%20%7B%0A%20%20twitter%20%7B%0A%20%20%20%20search(q%3A%20%24palabra%2C%20count%3A%20%24cantidad)%20%7B%0A%20%20%20%20%20%20...tuit%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Afragment%20tuit%20on%20Tweet%20%7B%0A%20%09%09%09text%0A%20%20%20%20%20%20retweet_count%0A%20%20%20%20%20%20user%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%7D&variables=%7B%0A%20%20%22palabra%22%3A%20%22ReactJS%22%2C%0A%20%20%22cantidad%22%3A%201%0A%7D&fbclid=IwAR3FyzqbOO7Gi_3YgvfRq_5y_xHV7QODsRxwpiIDPlRg0aAl7oMNawJhF_E)

Se acuerdan que "query" al principio era opcional y lo sacamos porque daba igual que este o no?
Bueno podemos darle una utilidad podemos nombrar al __QUERY__, los resultados no variarian, PERO podemos agregarle parametros.

Se hace asi:

```
query NOMBRE ($parametro: tipo!, $parametro2: tipo) {
  // código
}
```

Si ponemos `!` lo hacemos obligatorio.

Para usar las variables, abajo a la Izquierda hay otro editor de texto, usando notación JSON, pasamos las variables.

```
{
  "variable" : "valor"
}
```

- - - -
[<kbd>Volver</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/Prologo.md)
[<kbd>Inicio</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/README.md)
[<kbd>Siguiente</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/playground_mutation.md)

- - - -
[<kbd>Mutation</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/playground_mutation.md)
[<kbd>Schema</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/schemas.md.md)
[<kbd>Resolver</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/resolvers.md)
