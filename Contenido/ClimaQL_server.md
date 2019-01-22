# Server Side

Para la parte del server no vamos a hacer cosas tan diferentes a lo que hice en el anterior ejemplo de [CumpleQL](https://github.com/gastonpereyra/Apuntes_GraphQL/blob/master/Contenido/server_schemas.md), vamos a aprovechar varias cosas hechas ahi.

Lo que si voy a cambiar es que no voy a usar el middleware de esa vez, sino el de **Apollo**.

- *Por qué?*

- Para mostrar uno diferente, para mostrar uno que es popular y que se usa mucho, por muchas razones.

## Empezamos


1. Iniciamos

* Los que estan en sus maquinas

```
npm init -y
```

* Entremos a Glitch y le damos a crear un nuevo proyecto, "hello-express".

<img src="https://raw.githubusercontent.com/gastonpereyra/Apuntes_Glitch/master/imagenes/Glitch_hello_2.png">

2. Instalamos Babel

Al igual que aquella vez instalamos Babel, por las mismas razones, y configuramos el archivo correspondiente.

* En sus PC seria

```
npm install --save-dv babel-cli babel-preset-env babel-preset-stage-0
```

* En Glitch podemos usar el boton de agregar paquetes npm, o van modificamos `package.json` a mano y dejamos que cargue solo.





