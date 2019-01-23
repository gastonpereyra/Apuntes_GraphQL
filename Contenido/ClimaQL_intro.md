# ClimaQL

<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/ClimaQL_00.png" width="900">

Versión Glitch:
* <https://glitch.com/~climaql-server>

Versión del Front en GitPages (el back siempre esta en Gltich):
* <https://gastonpereyra.github.io/climaQL-server/>
* repo: <https://github.com/gastonpereyra/climaQL-server>


## Qué queria hacer ?

1. Queria usar una API de datos del clima, que fuera facil de usar, que no requiera de pedir claves o pagar.
2. Convertir esa API a GraphQL.
3. Hacer un front-end en React usando Apollo para mostrar como llevar los datos desde el server al browser.

## Qué pasó ?

1. No habia tantas como esperaba. La candidata mas firme era la del desafió de FCC. Pero en el medio me encontré con la del SMN Argentino.
   Pero habia un problema no estaba documentada, es decir no encontré un lugar donde dijiera donde y como pedir los datos.
   Asi que a prueba y error, y mucha intuición logré encontrar algunos cosas utiles, y documenté que endpoint hacia que cosa y los tipos de datos que se obtenian.
   Asi que decidí usar esa API.
2. No fue un problema, fue bastante simple
3. Me pareció mejor mostrar como sin ninguna libreria, ni framework se podia hacer algo simple y util, y dejar esa parte para otra oportunidad.
   Me parece que asi le sirve a mas gente y no solo a los que usan React.
   
## Qué hice ?

Esta es una web-app responsiva (funciona bien en un celular), que si habilitas la posibilidad que se tu pueda "ubicar" te muestra el clima actual de la estación meteorológica argentina más cercana a tu posición.
Muestra la temperatura, la sensación termica, una breve descripción del estado del clima y una imagen representativa.

También tiene la capacidad de ir a un playground para probar los Query, y de esta manera chequear el estado del clima mas detallado, pronosticos a varios dias, no solo de donde estas sino de todos lados.

## Problemas que tuve

Para encontrar la estación una opción facil de identificar es usar el ID de cada una de ellas, para eso habia que encontrar que coordenadas corresponden a que ID.

Entre las cosas que habia encontrado habia una pagina dentro del SMN que poniendo en la URL la latitud y longitud de tu lugar te devolvia un ID. Exelente pensé, después de probar un poco me di cuenta que el ID que te tiraba era generado (quien sabe como) y hacia cosas raras, en ciertas partes de capital te tiraba ID que no valian para buscar. De hecho en la pagina oficial si activaba la geolocalización me tiraba cualquier cosa.

Asi que lo cambié, a buscar la coordenada mas cercana, no usé las formulas matematicas para calculo exacto (que usan el radio de la tierra y esas cosas), algo simple.

Algo que se desprende fácil de esto es que no sirve fuera de Argentina. 
Si ingresamos coordenadas al azar de cualquier parte el query busca la mas cercana a esa posición.

Les muestro.. 

Tengo estas coordenadas de Brasil

<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/ClimaQL_alcance_1.png"> width="900">

Si voy al playground y pruebo me da un resultado asi:

<img src="https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Imagenes/ClimaQL_alcance_2.png"> width="900">

## Que usé para hacerla

Primero 2 herramientas principales: 
* [Glitch](https://glitch.com) para alojar el server
* [Github]() para guardar una versión del front y el repositorio por si quieren hacerle un fork y modificarlo.

Después usé:
* Node
* Express
* GrahpQL 
* Apollo server
* Bulma para darle un estilo al front

Y por supuesto la [API del SMN](https://github.com/gastonpereyra/smnQL)

BASTA, vamos a empezar

## ESPERA!

Antes de avanzar si no leiste, talves sea lo mejor

* [Sobre Resolvers](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/resolvers.md)
* [Sobre Front-End](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/manejando-el-front.md)
* [Sobre Wrapping](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/wrapping.md)

- - - -
[<kbd>Inicio</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/README.md)
[<kbd>Server</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/ClimaQL_server.md)
[<kbd>Front</kbd>](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/ClimaQL_front.md)
