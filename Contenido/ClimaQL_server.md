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

Y tenemos 2 datos que son Objetos `Weather` y `Forecast`. Vamos a hacerlos 


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

""" Pronostico de la Mañana """ 
type Morning {
    weather_id: Int
    description: String
}

""" Pronostico de la Tarde/Noche """ 
type Afternoon {
    weather_id: Int
    description: String
}

""" Pronostico Detalle """ 
type Forecasts {
    """ Fecha """ 
    date: String # (YYYY-mm-DD)
    """ Temperatura Minima / De la manaña, en °C """ 
    temp_min: Float
    """ Tempertura Maxima / De la Tarde, °C) """ 
    temp_max: Float
    temp_min_sub: Float
    temp_noc: Float # Noche?
    """ Radiacion solar, en UV """
    radiation: String 
    morning: Morning
    afternoon: Afternoon
}


""" Pronostico """
type Forecast {
    _id: ID
    timestamp: String
    date_time: String # (YYYY-mm-DD HH:MM)
    location_id: Int
    forecast: [Forecasts]
}
```
