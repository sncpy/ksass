# KSASS
El proposito de este proyecto es servir como template SASS/CSS para aplicaciones de konecta.

## Construcción
### Instalar las dependencias
Primero se debe descargar el instalador de nodejs desde su [página oficial](http://nodejs.org/download/).
Luego debe ejecutar el siguiente comando para descargar las dependencias del proyecto.

```sh
$ npm install
```

Este comando ya descaga todas las dependencias de npm y dispara el `bower install`
para descargar las liberías de terceros. Las liberías js descargadas con bower se
encuentran en `src/vendors`.

Este proyecto utiliza SASS para compilar los scss a css, por lo tanto hay que instalar el compilador que se encuentradesarrollado en ruby con los siguientes comandos:

```
$ sudo apt-get install ruby
$ sudo apt-get install rubygems
$ sudo gem install sass
```

### Iniciar el proyecto
Para levantar el proyecto en modo livereload para desarrollo se debe ejecutar el siguiente comando:

```sh
$ grunt server
```

Para compliar y empaquetar la aplicación debe ejcutar el siguiente comando:

```sh
$ grunt
```

El código compilado se ecuentra disponible en `dist`
