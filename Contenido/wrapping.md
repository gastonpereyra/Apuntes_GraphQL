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

Si decidimos modelarlos tal cual, los resolvers solo van a dedicarse a hacer un Fetch, filtrar, mapear o encontrar valores segun los query y mutation.

En cambio si lo modelamos como queremos es probable que en los resolvers tengamos que agregar cosas para que al devolver los valores esten en el formato correcto.

Es un concepto simple que vale la pena probar. 

- - - -
