# Front

<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/ClimaQL_front_1.png">

El Front voy a hacerlo simple, no hay cosas raras.

## Bulma

Voy a usar [Bulma](https://bulma.io/documentation/) para el maqueteado, para darle estilo y se vea masomenos lindo.
Podria haber usado Boostrap, Miligram, Materialize o cualquier otro, elegí Bulma porque me parece facil, simple, se ve bien.

Esta basado en Flexbox, es responsivo, lo que nos ahorra tiempo de trabajar en CSS. 

No tiene ni requiere librerias adicionales, lo que es bueno para trabajar en cualquier lado. Eventualmente podemos modificarlo y ahi usa Sass, pero no va a ser nuestro caso.

Para usarlo en `index.html` el `<head>` agregamos:

```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css">
```

Podriamos agregar a traves de npm. Pero con esto me es suficiente asi, por ahora.

Aca no se trata de enseñar a usar Bulma, asi que no voy a explicar como hacerlo, pero si tienen experiencia con Bootstrap es parecido.

### FontAwesome

También vamos a usar unos iconos de aca, y trabaja bien con Bulma asi que también lo agregamos

```
<script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
```

## Diseñando la página

Queria que la página fuera simple para empezar, por lo que elegí de todos los datos que podia obtener del back los siguientes:

* nombre y provincia del lugar
* temperatura y sensación termica
* descripción del clima
* el id del tipo de clima para ponerle una imagen representativa

Nada más.

Entonces para distribuirlos usé un elemento que tiene Bulma que se llama `hero`, este permite armar un elemento que ocupa todo el ancho de la pantalla, agregandole una clase mas se puede lograr que ocupé todo el alto tmb.

`hero` además permite agregar un encabezado y un footer. Entonces elegi poner en el footer botones con los links de las cosas que usé para hacerlo, a modo de "creditos". Y el encabezado para poner un logo tomado de una imagen libre de internet, y 2 botones, uno para resetear el pedido de la info del clima, y otro para redirigir hacia el playground.

La estructura de un `hero` es asi

```html
<div> class="hero is-fullheight">
      <!-- Barra Superior-->
      <div class="hero-head">
        <!-- Los elementos de la barra -->
      </div>
      <!-- Cuerpo princpial-->
      <div class="hero-body">
        <!-- Elementos del cuerpo-->
      </div>
      <!-- Footer-->
      <div class="hero-footer">
        <!-- Elementos del footer-->
      </div>
</div>      
```

### Barra Superior

Para los elementos aqui usé una navbar clasica. En Bulma como en otros similares, a medida que la pantalla se achica los elementos desaparecen y quedan para ser desplegados.

Asi se ve con una pantalla de escritorio:

<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/ClimaQL_navbar_1.png" width="900">

Asi cuando se va achicando:

<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/ClimaQL_navbar_3.png" width="400">

Y asi al apretar el icono para desplegar un menu

<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/ClimaQL_navbar_2.png" width="400">

Para esto usé unas elementos de Bulma llamado `navbar`, clasico..

```html
      <nav class="navbar">
          <div class="container">
            <!-- Logo de la Aplicación -->
            <div class="navbar-brand">
              <a class="navbar-item">
                <img src="logo.png" alt="Logo">
              </a>
              <!-- Para usar el menu Desplegable para Moviles -->
              <span class="navbar-burger burger" data-target="navbarMenu">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <!-- Botones del Menu -->
            <div id="navbarMenu" class="navbar-menu">
              <!-- A la izquierda -->
              <div class="navbar-start">
                <!-- item -->
                <span class="navbar-item">
                  <!-- Elemento tipo boton -->
                  <a class="button" href="#" >
                    Boton
                  </a>
                </span>
               </div>
              <!-- A la Derecha -->
               <div class="navbar-start">
                <!-- item -->
                <span class="navbar-item">
                  <a class="button" href="/graphql">
                    Boton 2
                  </a>
                </span>
              </div>
            </div>
          </div>
        </nav>
```

Para que funcione el tema del menu desplegable agregamos un script, simple:

```javascript
const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

if ($navbarBurgers.length > 0) {
  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {
      
      const target = el.dataset.target;
      const $target = document.getElementById(target);
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
  });
}
```

### Cuerpo

<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/climaQL_05.png" width="900">

Para ubicar los elementos en el cuerpo elegí poner `name` en un titulo, `province` en un subtitulo, h1 y h2 respectivamente.

Para poner el resto elegí usar un elemento tipo `media`, es igual que en el resto, imagen a la izquierda, texto a la derecha. No voy poner el código porque es simple, es igual que en el resto. 

Para darle un toque mejorado la `temperatura` y la `sensación térmica` la ubico en elementos llamados `tag` que son el equivalente de `pills` de otros como boostrap.

### Footer

<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/ClimaQL_02.png" width="800">

Solo botenes con links.. diferentes colores y con iconos.. no me voy a explayar mas.

El archivo completo: [ACA](https://github.com/gastonpereyra/climaQL-server/blob/master/views/index.html)

## SCRIPT

Vamos a lo importante, donde se produce la magia.

Además del script para el navbar aca hay que hacer un par de cosas importantes, siendo la principal hacer la llamada al API.

Primero antes que nada, agregó esto a `index.html` y le indico que carga al final

`<script src="/client.js" defer></script>` 

`client.js` va a estar en la carpeta `public`.

Segundo, para el uso de las imagenes segun el clima que haga uso las del SMN, pero uds pueden usar las que quieran, por un tema de facilidad pongo la url de cada imagen en 2 arrays, una para las imagenes del dia y otro para el de la noche. Ademas que el index en cada array coincida con el numero de `id` de cada tipo de clima.

```javascript
const image_day = [...];
const image_night = [ ... ];
```

Tercero, dejo en variables los elementos que voy a usar para ingresarles valores o hacerlos algun cambio

```javascript
const main = document.getElementById("main"); // para cambiar el color del fondo
const temp = document.getElementById("temp");
const st = document.getElementById("st");
const climaIcon = document.getElementById("climaIcon");
const desc = document.getElementById("desc");
const city = document.getElementById("city");
const province = document.getElementById("province");
```

Cuarto, armó la función que va a buscar las coordenadas.

```javascript
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position)=> getWeather(position.coords.latitude,position.coords.longitude), // Si esta tiene permiso busca por Coordenadas
      () => getWeather(-34.62170792,-58.42575836) // Si no tiene permiso trae una por Default 
    );
  } else { 
    desc.innerHTML= "ERROR - Su Navegador no soporta la Función requirada";
  }
}
```

En este caso busca las coordenadas si hay un error, busca una por default.

`getWeather(lat,lon)` es una función que se encarga de buscar en la API y modificar los elementos.

Se ve masomenos asi:

```javascript
function getWeather(lat,lon) {
  // Si es de Dia o Noche
  const isDay = (new Date().getHours() > 7 && new Date().getHours() < 19);
  
  fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Le paso el Query en JSON
    body: JSON.stringify({ 
      query: `{ 
          estacion: getWeatherByCoords(lat: ${lat}, lon: ${lon}) {
            name
            province
            weather { 
              temp 
              st 
              description 
              id 
            } 
          } 
        }` 
      }),
    })
    .then(res => res.json()) // Recivo respuesta positiva, convierto a JSON
    .then(res => res.data.estacion) // Saco la data con el Alias
    .then(estacion => ({
      // Formateo la info par usarla
      "name": estacion.name,
      "province": estacion.province,
      "temp": estacion.weather.temp,
      "st": estacion.weather.st,
      "weather_id": estacion.weather.id,
      "description": estacion.weather.description
    }))
    .then( clima => {
      // Actualizó los datos con la info de la API
      city.innerHTML= clima.name;
      province.innerHTML= clima.province;
      temp.innerHTML= clima.temp+"°C";
      st.innerHTML= clima.st ? clima.st+"°C" : " - ";
      climaIcon.src= isDay ? image_day[clima.weather_id] : image_night[clima.weather_id];
      desc.innerHTML= clima.description;
      // Cambio colores segun hora y temp
      main.classList.add(isDay ? "is-light" : "is-dark");
      const tempColor = clima.temp > 30 ? "is-danger" : 
                  clima.temp > 25 ? "is-warning" : 
                  clima.temp > 15 ? "is-success" : 
                  "is-info"; 
      const stColor = !clima.st ? "is-white" :
                  clima.st > 30 ? "is-danger" : 
                  clima.st > 25 ? "is-warning" : 
                  clima.st > 15 ? "is-success" : 
                  "is-info"; 
      temp.classList.add(tempColor);
      st.classList.add(stColor);
      desc.classList.add("is-primary");
    })
    .catch(error => {
      desc.innerHTML= "ERROR - "+error;
    });
}
```

* Uso Fetch con POST, le paso un query en formato JSON y espero la resuesta de `/graphql`
* esa respuesta lo parseo, luego le saco lo que me interesa, use un alias en el query para hacerlo mas facil.
* le doy un formato para que sea facil usarlo mas tarde, este paso es innecesario, lo hago para comodidad
* luego actualizo los componentes de la pagina, les inserto los datos, algunos les cambio de color usando clases predefinidas de bulma.

Finalmente, pongo que se ejecuté la función

```
getLocation();
```
El archivo completo: [ACA](https://github.com/gastonpereyra/climaQL-server/blob/master/public/client.js)


## Vamos a probar

Al ingresar a la página se verá algo asi:

<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/ClimaQL.png" width="900">

Mientras no le aceptemos que nos ubique o no se ve asi:

<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/ClimaQL_00.png" width="900">

Si es de dia se ve asi:

<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/ClimaQL_dia.png" width="900">

Si es de noche se ve asi:

<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/ClimaQL_noche.png" width="900">

Si hace frio:

<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/ClimaQL_frio.png" width="900">

Funciona. Se ve bien. Y tenemos la posibilidad de seguir ampliandola, lo haremos una proxima vez.


### FIN

- - - -
[<kbd>Inicio</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/README.md)
[<kbd>Intro</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/ClimaQL_intro.md)
[<kbd>Server</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/ClimaQL_server.md)
