# Como usar en el Front-end

En el back, una API hecha con GraphQL nos deja con UN solo endpoint. 
Desde alli hacer todos los pedidos que necesitemos, tanto Query como Mutation.

## Endpoint

En general cuando se configura el server el endpoint por default que se termina usando es

* `dir_base`+`/graphql`

Y es alli donde debemos apuntar nuestros pedidos.

## Query

Supongamos que podemos y queremos ejecutar el siguiente query para obtener info

```graphql
query {
  buscarBibliotecas {
    nombre
    direccion
  }
}
```
Un query bastante simple, sin parametros, ni nada complicado, en el playground funciona y esperamos obtener algo asi:

```json
{
  "data": {
    "buscarBibliotecas": [
      {
        "nombre": "Nacional",
        "direccion": "Agüero 2502, CABA"
      },
      {
        "nombre": "Congreso de la Nación",
        "direccion": "Av. Hipólito Yrigoyen 1750, CABA"
      },
      {
        "nombre": "Pedagógica y Popular “Domingo F. Sarmiento",
        "direccion": "San Martín 2839 (3000), Santa Fe"
      },
      { "// y sigue ..."}
    ]
  }
}
```

El endpoint seria:

* `dir_base`+`/graphql` + `?query={buscarBibliotecas{nombre direccion}}` 

Y obtendrias un JSON.

Lo mismo para los **Mutation**

## Sin Frameworks

Un forma fácil de hacer estos pedidos sin usar nada especial es haciendo un fetch en **POST**. Sea para Query o para Mutation.

Asi:

```javascript
const API = "https://www.esEjemplo.com/graphql";

const objetoQuery = {
  query: '{
    buscarBibliotecas {
       nombre
       direccion
     }
   }' 
};

fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( objetoQuery ),
    })
    .then(res => res.json())
    .then(res => {
      const bibliotecas = res.data.buscarBibliotecas;
      bibliotecas.forEach( b => {
        console.log("nombre: "+b.name+", dirección: "+b.direccion);
      });
    });
```
Sin muchos misterios. 
Si ya han usado Fetch, es como siempre, solo que en el cuerpo le pasamos un JSON. 

* Donde el key es `query` o `mutation`
* y el valor es un string con los valores a ejecutar.

Al recibir la respuesto, lo parseamos como un JSON cualquiera. La info viene dentro de Data, y
por el nombre de la función ejecutado o el ALIAS si le pusimos.

Es como igual a las repuesas de los playgrounds.

Fácil.

## Con Frameworks

Bueno los Frameworks vienen con mas opciones y facilidades, como caché de memory entra otras cosas.
Y además vienen diseñados para otros Frameworks y librerias y su metodologia particular.
Por ejemplo van a encontrar para Angular, React, Vue y otros tantos..

## Ejemplo con React y Apollo

Solo para mostrar un ejemplo en React con Apollo

```javascript
// Cosas de React
import React from 'react'
import ReactDOM from 'react-dom'
// Componente de React
import App from './components/App'
// cosas de Apollo
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'

// Dirección Base
const httpLink = createHttpLink({
  uri: 'http://www.esEjemplo.com'
})
// Configurar el cliente de Apollo, aca se puede configurar con más cosas
const client = new ApolloClient({
  link: httpLink
})

ReactDOM.render(
  // Se "wrappea" como se hace con Redux
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
```

Asi seria la configuración incial y despues para hacer un query

```javascript
// Cosas de React
import React, { Component } from 'react'
// Cosas para hacer los query
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

// Creando el Query
const QUERY = gql`
 {
    buscarBibliotecas {
      id
      nombre
      direccion
    }
  }
}
`

// Componente
export class App extends Component {
  render() {
    return (
      // Usando el query
      <Query query={QUERY}>
        
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
    
          const bibliotecas = data.buscarBibliotecas
    
          return (
            <ul>
              {bibliotecas.map( b => <li key={b.id}> {b.nombre+", "+b.direccion} </li> />)}
            </ul>
          )
        }}
        
      </Query>
    )
  }
}
```

Explicación breve:
* `graphql-tag` a traves de `gql` transforma a sintaxis de Graphql
* Se encierra el componente entre `<Query"></Query>`, esta tiene una propieda para pasarle el query
* devuevle un objeto con 3 valores, la data, si hay error y si esta cargando. Que puede ser usado dentro por ejemplo para hacer una función que los usé y renderize segun corresponda)

Para los Mutation existe el componente analogo llamado `<Mutation mutation={MUTATION}></Mutation>`

Por supuesto hay que usarlos, ir viendo que otras cosas tiene para sacarle mas provecho. Talves haga un ejemplo practico usando alguno de estos frameworks.

- - - -

[<kbd>Inicio</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/README.md)
[<kbd>Siguiente</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/wrapping.md)
[<kbd>Siguiente</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/manejando-el-front.md)
