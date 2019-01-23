# Server Side

Para la parte del server no vamos a hacer cosas tan diferentes a lo que hice en el anterior ejemplo de [CumpleQL](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/server_schemas.md), vamos a aprovechar varias cosas hechas ahi.

Lo que si voy a cambiar es que no voy a usar el middleware de esa vez, sino el de **Apollo**.

- *Por qué?*

- Para mostrar uno diferente, para mostrar uno que es popular y que se usa mucho, por muchas razones.

## Empezamos


1. Iniciamos

> Los que estan en sus maquinas

```
npm init -y
```

> Los de Glitch y le damos a crear un nuevo proyecto, "hello-express".

<img src="https://raw.githubusercontent.com/gastonpereyra/Apuntes_Glitch/master/imagenes/Glitch_hello_2.png">

2. Instalamos Babel

Al igual que aquella vez instalamos Babel, por las mismas razones, y configuramos el archivo correspondiente.

* `babel-cli`
* `babel-reset-env`
* `babel-preset-stage-0`

> En sus PC seria

```
npm install --save-dv babel-cli babel-preset-env babel-preset-stage-0
```

> En Glitch podemos usar el boton de agregar paquetes npm, o van modificamos `package.json` a mano y dejamos que cargue solo. 

Creamos el archivo `.babelrc`, y lo configuramos

```
{
    "presets": [
        "env",
        "stage-0"
    ]
}
```

3. Instalamos el resto de las dependencias

Vamos a usar

* `nodemon`
* `graphql`
* `graphql-import`
* `apollo-server-express` / middleware para usar graphql en express
* `node-fetch` / porque vamos a hacer fetch a una REST

> en sus maquinas seria y esperar

```
npm install --save nodemon
npm install --save node-fetch
npm install --save graphql graphql-express
npm install --save apollo-server-express
```
> En Glitch o por el botón o a mano y dejarlo cargar

4. configuramos el script 

Cambiamos a 

```
"scripts": {
    "start": "nodemon ./server.js --exec babel-node -e js"
  },
```

El `package.json` deberia quedar algo parecido a esto:

```json
{
  "author": "// su nombre",
  "name": "climaql-server",
  "version": "0.4.2",
  "description": "Server para una app para mostrar el clima en Argentina",
  "main": "server.js",
  "scripts": {
    "start": "nodemon ./server.js --exec babel-node -e js"
  },
  "dependencies": {
    "express": "^4.16.4",
    "graphql": "^14.1.1",
    "graphql-import": "^0.7.1",
    "apollo-server-express": "^2.3.1",
    "nodemon": "^1.18.9",
    "node-fetch": "^2.3.0"
  },
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-stage-0": "^6.24.1"
  },
  "engines": {
    "node": "8.x"
  },
  "repository": {
    "url": "//donde vayan a guardar el repo"
  },
  "license": "MIT",
  "keywords": [
    "node",
    "glitch",
    "express",
    "graphQL",
    "apollo",
    "weather"
  ]
}
```
Pueden ver el archivo: [aca](https://github.com/gastonpereyra/climaQL-server/blob/master/package.json)


## Schemas

Cree los archivos:

* `api/schemas.js`
* `api/schemas.graphql`
* `api/resolvers.js`

Para hacer los Schemas vamos a usar esta [API](https://github.com/gastonpereyra/smnQL/tree/master/docs/api) por lo que tenemos que modelar los datos que vamos a usar de ahi.

No voy a querer usar ahora TODO eso, solo me quedo con la parte del Clima Actual, me quedó con `map_items/weather`, vemos que dato devuelve [ACA](https://github.com/gastonpereyra/smnQL/blob/master/docs/api/clima.md).

Estan anidados, algunos hay que formatearlos, es bueno practicar.

Entonces vamos a `schemas.graphql` y empezamos armarlo:

```graphql
type WeatherReport {
    _id : ID
    dist : Float
    lid : Int
    fid : Int
    int_number : Int
    name : String
    province: String
    lat: Float
    lon: Float
    zoom: Int
    updated: Int
    weather: Weather
    forecast: Forecast
}
```

Muchos de esos datos no sé lo que son, puedo intuirlos, los más interesantes son 
* `lid` y `fid` que son el ID de la estación donde se toman los datos. 
* `name` es el nombre de la localidad y `province` de la provincia (obvio). 
* `lat` y `lon`, las coordenas lo vamos a usar para ubicar las personas y su cercania

Y tenemos 2 datos que son Objetos `Weather` y `Forecast`. Vamos a hacerlos.

Empezamos con Weather.


```graphql
type Weather {
    temp : Float
    tempDesc: String
    st : Float
    humidity: Int
    pressure: Float
    visibility: Int
    wind_speed: Int
    id: Int 
    description: String
}
```

De aca vemos que podemos sacar muchos datos interesantes, algo para destacar `id` lo usan para el dibujo de que tipo de clima esta haciendo (sol, nubes, lluvia, tormenta, etc..)

Sigamos con el de Forecast (pronostico)

```graphql
type Forecast {
    _id: ID
    timestamp: String
    date_time: String 
    location_id: Int
    forecast: [Forecasts]
}

type Forecasts {
    date: String
    temp_min: Float
    temp_max: Float
    temp_min_sub: Float
    temp_noc: Float
    radiation: String 
    morning: Morning
    afternoon: Afternoon
}

type Morning {
    weather_id: Int
    description: String
}

type Afternoon {
    weather_id: Int
    description: String
}
```

Si leen lo que dice la documentación que hice sobre esto, aparece que los Forecasts al pedirlos por la API vienen en objeto, y lo queremos array, candiato para ser formateado en los Resolvers.

Tambipen se puede ver que hay otro endpoint de la REST API original que usa estos datos asi que los vamos a traer para aprovecharlo.
* `/forecast`

## Query y Mutation

En este caso no habrá mutation, no queremos guardar nada, ni actualizar.

Si vamos a querer Query, se me ocurrieron un par
* mostrar todos las estaciónes.
* buscar por ID una estación
* encontrar una estación por coordenadas
* mostrar todos los pronosticos y el de una estacion por ID

Pueden ser más, claro. Mas adelante la voy a seguir ampliando pero me comprometo a mantener estos sin modificaciones.

Entonces hay que agregarlos

```graphql
type Query {
  getWeatherById(id: Int!): WeatherReport
  getWeatherByCoords(lat: Float!, lon: Float!): WeatherReport
  getWeathers: [WeatherReport]
  getForecast(id: Int!): Forecast
  getForecasts: [Forecast]
}
```
Terminamos la parte mas larga. El archivo completo -> [aca](https://github.com/gastonpereyra/climaQL-server/blob/master/api/schemas.graphql)

## Schemas.js

Ahora vamos a `schemas.js` y agregamos para que quede listo para ser usado

```javacript
import { importSchema } from 'graphql-import';
export const typeDefs = importSchema('./api/schemas.graphql');
```

Es similar a lo que hicimos en el ejemplo anterior, usamos importSchema para importar el archivo y lo exportamos.

## Resolvers

Vamos a empezar configurando lo que vamos a usar

```javascript
import fetch from 'node-fetch';
const URL_SMNAPI = 'https://ws.smn.gob.ar/'; // Dirección de Base de la REST-API
```

Primero antes que todo tuve que resolver el tema de las coordenadas. Para eso cree esta función.

```javascript
const getClosestStation = (lat, lon, stations) => {
  let closest = null; // index de la estación mas cercana
  let closest_ref= null;// referencia de la diferencia entre la lat y lon a buscar y la de la estación

  // Buscamos dentro de la Colección
  const selectStation = stations.find( (station, i) => {          
    if (closest === null) { // Si es el primer valor inicializamos
      closest = i;
      closest_ref= Math.abs(parseFloat(lat)-parseFloat(station.lat)) + Math.abs(parseFloat(lon)-parseFloat(station.lon));
    }
    else {
        // Valores Relativos de la posicion actual y la estación
        const new_ref = Math.abs(parseFloat(lat)-parseFloat(station.lat)) + Math.abs(parseFloat(lon)-parseFloat(station.lon));
        // Comparamos los valores, mas cerca de 0 simultaneamente mas cerca
        if (new_ref<closest_ref) {
          // Cambiamos los valores de referencia
          closest_ref = new_ref;
          closest = i;
      } 
    }
    return (closest_ref === 0) // equivalente a (station.lat === lat && station.lon === lon)
  })
  // Si encontró la estación la devolvemos sino la mas cercana
  return selectStation ? selectStation : stations[closest];
};
```

Probablemente no sea la mejor manera de resolver como buscar la estación mas cercana a una coordenada. Pero fue la mas que salió mas facil.

Ahora si vamos por los Resolvers.

Lo que vamos a usar, los 5 queries, y el de formateo de los Forecasts.

```javascript
export const resolvers = {
  Query: {
    getWeatherByCoords: (root, {lat, lon}) => // codigo
    },
    getWeatherById: (root, {id}) => // codigo
    },
    getWeathers: () => // codigo
    },
    getForecast: (root, {id}) => // codigo
    },
    getForecasts: () => // codigo
  },
  Forecast: {
    forecast: (root) => // codigo
  }
}
```

* Vamos a resolver el de Forecast, solo debemos convertir ese objeto al array que queremos que sea.

```javascript
    forecast: ({forecast}) => Object.keys(forecast).map( key => forecast[key])
```

* Fue facil, sigamos con el de devolver todos los Climas Actuales. Tenemos que ir a buscar a la API, y traer el objeto.

```javascript
    getWeathers: () => {
      return fetch(URL_SMNAPI+"map_items/weather")
        .then( res => res.json())
        .catch(error => {
          console.log("Error Weather : "+error);
          return [];
        });
    }
```

* Sigamos con uno similar, el de devolver todos los pronosticos

```javascript
    getForecasts: () => {
      return fetch(URL_SMNAPI+"forecast")
        .then( res => res.json())
        .then ( (forecasts) => forecasts.map( forecast => {
            const forecastKeys= Object.keys(forecast.forecast);
            return ({
              "_id": forecast._id,
              "timestamp": forecast.timestamp,
              "date_time": forecast.date_time,
              "location_id": forecast.location_id,
              "forecast": forecastKeys.map( key => forecast.forecast[key])
            });
        }))
        .catch(error => {
          console.log("Error Weather : "+error);
          return [];
        });
    }
```

* Vamos a buscar una estación por ID, hacemos el pedido y filtramos

```javascript
    getWeatherById: (root, {id}) => {
      return fetch(URL_SMNAPI+"map_items/weather")
        .then( res => res.json())          
        .then ( stations =>  stations.find( station => station.lid === parseInt(id) ))
        .catch(error => {
          console.log("Error Weather : "+error);
          return null;
        });
    }
```

* Ahora por Coordenadas, usamos la función que definimos antes.

```javascript
    getWeatherByCoords: (root, {lat, lon}) => {
      return fetch(URL_SMNAPI+"map_items/weather")
        .then( res => res.json())          
        .then ( stations => getClosestStation(lat,lon,stations))
        .catch(error => {
          console.log("Error Weather : "+error);
          return null;
        });
    }
```
* Hacemos lo mismo con los pronosticos

```javascript
    getForecast: (root, {id}) => {
      return fetch(URL_SMNAPI+"forecast")
        .then( res => res.json())
        .then ( stations => stations.find( station => station.location_id === parseInt(id) ) )
        .then ( (forecast) => {
          const forecastKeys= Object.keys(forecast.forecast);
          return ({
            "_id": forecast._id,
            "timestamp": forecast.timestamp,
            "date_time": forecast.date_time,
            "location_id": forecast.location_id,
            "forecast": forecastKeys.map( key => forecast.forecast[key])
          });
        })
        .catch(error => {
          console.log("Error Weather : "+error);
          return [];
        });
    },
```

El archivo Completo [aca](https://github.com/gastonpereyra/climaQL-server/blob/master/api/resolvers.js)

Haciendo esto lo que logramos fue hacer un Wrapping Rest, y ahora tenemos una REST API lista para usar como GraphQL, y no fue dificil, la mayorai de las cosas solo fueron Fetchs, y le agregamos algunas caracteristicas que originalmente no tenian.

## Server

Para configurar el resto del server en Express y enchufar el Middleware, no es dificil es bastante parecido a lo anterior

```javascript
import express from 'express'; // Modulo de Express
import { ApolloServer } from 'apollo-server-express'; // Modulo para Apollo
import { typeDefs } from './api/schemas'; // Schemas
import { resolvers } from './api/resolvers'; // Resolvers

// Iniciar Express
const app = express();

// Paginas Estaticas
app.use(express.static('public'));
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// Iniciar el Server de GraphQL
const server = new ApolloServer({typeDefs, resolvers});
server.applyMiddleware({app}); // Conectar Apollo con Express

// Listo para Escuchar Request
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

```
Lo que hice fue:
* traer los modulos correspondientes, como el de Express y Apollo
* traer los schemas y los resolvers
* configurar Express
* configurar el middleware de Apollo
* poner el servidor a escuchar

Para el middleware de Apollo solo tuve que pasarle los Schemas como `typeDefs` y los `resolvers`.

Ahora tenemos un endpoint `/graphql`.

ESto nos da un Playground en esa dirección, y ademas podemos mandarle queries y obtener una respuesta.

- - - -
