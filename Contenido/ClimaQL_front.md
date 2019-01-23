# Front

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

## Diseñando la pagina


