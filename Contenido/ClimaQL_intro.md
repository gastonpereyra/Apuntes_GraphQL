# ClimaQL

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

## Alcance

Si no habilitas la posibilidad de obtener tu Ubicación, tira una default, en mi caso pusé que sea de Capital Federal, arbitrario total.

Sin entrar al playground y por ende sin saber de Graphql no se puede acceder a más datos.

Algo que se desprende fácil no sirve fuera de Argentina. 
Si ingresamos coordenadas al azar de cualquier parte el query busca la mas cercana a esa posición.



