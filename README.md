# Aprendiendo 🅰ngular 19

Para empezar es necesario tener instalado la version de node especifica segun el proyecto que quieras iniciar tmb me recomendaron la version 16 de angular porque suele ser muy estable.

Primer paso es tener ng instalado, si no esta instalado se tiene que instalar con el siguiente comando de forma global

```bash
npm install -g @angular/cli
```

Para ejecutar el servidor de angular se ejecuta el siguiente comando, este comando compila y lanza un puerto que servira al proyecto en modo desarrollo

```bash
    ng serve && npm start
```

## Conceptos de Angular

Que es interceptor: 

Que es un servicio: 



_`Que es un pipe:`_ Los pipes son funciones que se ejecutan antes de mostrarse en la vista, mejor dicho son funciones que se transforman antes de mostrarse en la vista del usuario y se utilizan junto a la **interpolacion** y se utilizan con el operador `|`. Los pipes no funcionan en los bucles @for

_`Servicios`_ : Los servicios podriamos decir que son los llamados customHooks de react que nos permiten llevar la logica de un componente para que puedan ser reautilizados, o simplemente llevarlos fueras de componente principal, La verdadera
`Definicion` es que son simplemente clases que nos permiten encapsular logica reutilizable y permite la comunicacion entre un componente

_`RxJS`_: React Extensiones para Javascript.

_`HttpClient`_: HttpClient es un servicio ya definido de angular que nos permite hacer peticiones en Angular por medio de servicios.

_`selector Props`_ : Es el nombre que se le da en el documento html o la etiqueta.

_`templateUrl`_ : Es la ruta de donde se encuentra el documente html del componente.

_`template`_ : Puedes poner tu documento html aqui tambien, pero lo mejor seria separar la vista de la logica lo mas posible.

_`CommonModule`_ : Son aquellos componentes que son dependientes de sus modulos

_`imports en @Component`_ : Se utiliza para importar modulos o componentes que el componente necesita para funcionar. Por ejemmplo al utilizar standalone y querer utilizar el \*ng necesitamos importar el CommonModule para que este traiga esas funcionalidades

` ngOnInit`: Se ejecuta despues que angular crea el componente perfecto para ejecutar llamadas apis y todo lo demas, mucho mas recomendable que el metodo constructor de Angular , para implementar algo de el se utiliza la herencia de **JS** con el implements metodo de clase.

## Estructuras de Carpetas Sencilla

```
/nombre-del-proyecto
│── 📂 src
│   ├── 📂 app
│   │   ├── 📂 core        → Servicios globales, guards, interceptores
│   │   ├── 📂 shared      → Componentes, pipes y directivas reutilizables
│   │   ├── 📂 modules     → Módulos organizados por funcionalidad
│   │   ├── 📂 pages       → Componentes específicos de cada página
│   │   ├── 📂 components  → Componentes generales usados en varias partes
│   │   ├── 📂 services    → Servicios específicos de cada módulo
│   │   ├── app.module.ts  → Módulo principal
│   │   ├── app.component.ts  → Componente raíz
│   ├── 📂 assets         → Imágenes, fuentes, JSON, etc.
│   ├── 📂 environments   → Configuración de entornos (`prod`, `dev`)
│   ├── main.ts           → Punto de entrada de Angular
│   ├── index.html        → Archivo principal HTML
│── angular.json          → Configuración de Angular
│── package.json          → Dependencias del proyecto
│── tsconfig.json         → Configuración de TypeScript
```

Angular para componentes grandes la mejor manera de escribir los componentes en features si son rutas o components carpeta por si es una carpeta, dentro de estos directorios debe ir el archivo **TS** el archivo **CSS** el archivo **HTML** y opcional el de las rutas de ese componente para manejar esa ruta

## Rutas Angular v19

Para manejar las rutas de angular se necesita el archivo app.route.ts, funciona similar al outlet de javascript, mejor dicho en react para poner que queremos poner se envuelve ese componente dentro de ello

```ts
import { Routes } from "...";
import { NormalComponent } from "...";

export const routes: Routes = [{ path: "", component: NormalComponent }];
```

Recibe una lista de objectos que contiene la ruta junto a al elemento, similar a la sintaxis de `react-router-dom`

## Comandos Basicos

Los comandos son similares a los comandos de **Vite** en React

Para ofuscar el codigo , optimizar el codigo y frontend para produccion.

```bash
ng build
```

El comando crea el tipico directorio **dist** que contiene todo el codigo para produccion.

Alternativa sencilla en el package.json a **ng serve**

```bash
ng start
```

Para todo lo que tiene que ver con testing esta el comando:

```bash
ng test
```

# Inicio

Aprendi cosas sencillas como el cambio de nombres en los templates y como funcionan las templates sencillas en angular para mandar bloques de codigo, tambien lo sencillo de como funcionan las rutas, como poner algunas carpetas y esctructurar los componentes y rutas y tambien algunas cosas para el funcionamiento detras de Angular

## Creacion de los componentes desde Angular CLI

```
ng generate component <name-component> --standalone --inline-template --skip-tests
```

**Altenativa con path**

```
ng generate component <ruta>/<name-component>
```

El comando generara un directorio que tendra el componente de angular o ts y tambien los estilos de ese componente

```
| __ <name-component> 📁
|    |
    -- home.component.ts
    -- home.component.css
```

## Manejo de Eventos en Angular

En angular los eventos funcionan algo similar a react o la mayoria de framework o modulos javascript, su sintaxi es sencilla

```html
<button (click)="mostrarAlgo()">Presioname</button>
```

Donde `click` es el evento a hacer y **mostrarAlgo()** es simplemente esa funcion o mejor dicho metodo que se hara cuando se dispare ese listener

Ahora la question seria donde esta la funcion que se ejecuta cuando se presiona el boton, sencillo en angular las funciones se definen en las mal llamadas `props` de un componente, es decir definen dentro del archivo `namecomponent.component.ts`

Tambien es importante saber que esas funciones son mejor dicho metodos porque no es necesario darle a entender que son funciones a javascript, porque son mas metodos por asi decirlo porque estan dentro de la importacion de la clase.

Ejemplo de esto

```ts
export default class ButtonPressed {
  mostrarAlgo() {
    window.alert("Hola Soy tu primer componente Reactivo y no Angulativo ⚛️👑");
  }
}
```


# Creaciones de referencias en el DOOM con angular

Las referencias en el doom con angular se pueden hacer desde diferentes, un ejemplo sencillo para hecerlos es con los decoradores `@ViewChildren` y `@ViewChild`, tanto singular como plural, nos permite hacer referencias sencillas dentro angular 

Es importante hacer las referencia dentro de html con la asignacion unica de angular

```ts
import { ViewChild } from "@angular/core"

export class ComponentPrueba {
  @ViewChild("son") bloques! : <ElementRef<HTMLInputElement>>
}

```

## [(ngModel)]

## Ejemplos de Eventos de Angular

Evento **click**

```ts
click = "nombreFuncion()";
```

Evento **change**

```ts
change = "nombreFuncion()";
```

Evento **input**

```ts
input = "nombreFuncion()";
```

Evento **submit**

```ts
submit = "nombreFuncion()";
```

## Clases dinamicas en Angular

Primer hay que tener en cuenta en importar las directivas en tu documento o componente eso se hace con el `CommonModule`

Es importante tener importado commonmodule de angular core


## Templates

En angular los templates son pedazos de codigo HTML que nos permite y nos sirve para escribir algunas caracteristicas de angular y no es necesario incluir etiquetas como `<body>` `<base>` `<html>` y se ignora la etiqueta `<script>` por seguridad, y esta definidos solo para definir la interfaz o diretris

## Binding Syntax

El encuadernamiento de datos nos permite personalizar el HTML especificando valores con atributos de cadena desde el HTML , lo q nos propociona el encuadernamiento de datos es simplemente inicializar esta parte, como por dicho desde el **JS** o **Angular** en vez del HTML, es decir que funcionan desde el doom:

Ejemplos de personlizacion de los atributos de cadena desde javascript

### Los cuatro tipos de Biding syntax son

#### Interpolation - Interpolacion

`app.component.html`

```html
<p>{{ name }}</p>
```

`app.component.ts`

```ts
export default class AppComponent {
  name: string = "Soy angulativo";
}
```

#### Property Binding

`app.component.html`

```html
<input [value]="message" />
```

`app.component.ts`

```ts
export default class AppComponent {
  message = "Hello soy el valor de un input 😂";
}
```

#### Event Binding

`app.component.html`

```html
<button (click)="funcionARealizar()">Presioname</button>
```

`app.component.html`

#### Two-Way biding - Angular

## Renderizado de clases condicional

Angular tiene su propia directiva llamada `ngClass` que nos permite darle estilos condicionales a una etiqueta de html y hay diferentes formas de hacerlo, en un `string`, `array` y en un `objeto`, le pasamos nuestro argumento, algo sencillo como un ternario estaria bien y despues nuestras clases para que se ejecuten dependiendo de la funcion

### Sintaxis

```html
<button [ngClass]="<expresion_si_si> ? ´clase_si_Si´ : ´clase_si_No´ ">Presioname</button>
```
### Clases dinamicas en entradas HTML 

Es sencillo es lo mas similar a los ternarios en javascript en general o mejor dicho en todo react tmb, no permiten tener clases condicionales a entradas segun su estado, o por lo que veo este tipo de validaciones tiene un evento similar onchange que se ejecuta cada vez que encuentra un cambio en el nodo seleccionado lo cual lo hace demasiado facil de usar, solo seria hacer la refercia a el `FormControlName que tiene el mismo elemente y usar el metodo get para obtener el valor, despues solo comprobar si es valido = valid o invalido = invalid`, poner el millon de cosas que quermos que tenga nuestro input y listo


```html
<input type="text" formControlName="name" [ngClass]="{
  `border-green-500 border` : form.get(`name`)?.valid,
  `border-red-500 border`: form.get(`name`)?.invalid,
}"  />
```


## Signals

Los signals son una nuevo manejo de estado hecho por angular similares a los estados de `react`, tienen un effect y asi como señales, cuando algo cambia este verifica si cambia algo en la ui y lo actualiza, la diferencia de las señales con los estados de react es que los señales estan hecos para una mejor optimizacion, ademas que tiene diferentes metods que podrian ayudarnos y no solo un `setteador`.

### Sintaxis

```ts

const contador = signals(0);

handleChangeContador (){
    this.contador.set(this.contador() + 1)
}

```

## Tipos de Pipes

Los pipes son funciones que se transforman algo antes de mostrarse en la vista y se hacen con el operador de `|`


Algunos pipes se tienen que importar en el modulo o en el componente para ser usado, tales como `currency` o el `titlecase`

Pipes de `string`

```ts
{
  {
    "hola mundo" | uppercase;
  }
}
{
  {
    "hola mundo" | lowercase;
  }
}
```

Pipes de fecha `fecha`

```ts
{{fecha | date:"dd/MM/yyyy"}}
```

Pipes de formato de moneda o `currency`

```ts
{
  {
    fecha | currency;
  }
}
```

Pipes de `json`

```ts
{
  {
    data | json;
  }
}
```

> [!NOTE]
> Se pueden crear Pipes personalizables .

En resumen los pipes son funciones que se transforman antes de mostrarse en la vista y se utilizan con el operador | en las plantillas de Angular y nos permiten hacer cosas simples para la vista del usuario

## Comandos Angular Cli

```sh
ng generate component
```

```bash
ng generate module
```

```bash
ng generate service
```

```bash
ng generate directive
```

# Decoradores en Angular

    @Component: se utiliza para definir un componente en Angular. Se utiliza para especificar la plantilla, estilos y metadatos asociados con el componente.
    @Directive: se utiliza para definir una directiva personalizada en Angular. Las directivas se utilizan para agregar comportamientos específicos a elementos de la interfaz de usuario.
    @NgModule: se utiliza para definir un módulo en Angular. Los módulos se utilizan para agrupar componentes, directivas, servicios y otros objetos relacionados entre sí.
    @Pipe: se utiliza para definir una tubería en Angular. Las tuberías se utilizan para transformar datos en tiempo real en una plantilla.
    @Injectable: se utiliza para definir un servicio en Angular. Los servicios son una forma de compartir datos y funcionalidades entre componentes.
    @Input: se utiliza para definir una propiedad de entrada en un componente. Las propiedades de entrada se utilizan para pasar datos a un componente desde un componente padre.
    @Output: se utiliza para definir un evento en un componente. Los eventos se utilizan para enviar datos desde un componente hijo a un componente padre.
    @HostBinding: se utiliza para enlazar una propiedad de un componente a una propiedad del elemento DOM que lo contiene.
    @HostListener: se utiliza para escuchar eventos del elemento DOM que contiene el componente.
    @ContentChild: se utiliza para obtener una referencia al primer elemento secundario coincidente de un componente.
    @ContentChildren: se utiliza para obtener una referencia a todos los elementos secundarios coincidentes de un componente.
    @ViewChild: se utiliza para obtener una referencia al primer elemento hijo coincidente de un componente.
    @ViewChildren: se utiliza para obtener una referencia a todos los elementos hijos coincidentes de un componente.
    @Attribute: se utiliza para obtener el valor de un atributo en un elemento DOM.
    @Self: se utiliza para indicar que una inyección de dependencia debe ser resuelta solo en el propio componente.
    @Optional: se utiliza para indicar que una inyección de dependencia es opcional y no causará un error si no se puede resolver.
    @SkipSelf: se utiliza para indicar que una inyección de dependencia debe ser resuelta por un componente superior en la jerarquía de componentes.
    @Inject: se utiliza para especificar un proveedor de inyección de dependencia personalizado en un componente.

# Cosas a tener en cuenta

Me llevo 5 minutos arreglar una interfaz y fue simplemente porque la interfaz que puse se encontraba debajo del decorador `@Component` algo que sin escusa tiene sentido ya q este espera si o si un componente en clase, pero es algo a tener en cuenta sin duda.

❌ Los pipes no funcionan dentro de bucles @for una cosa demasiado rara en angular

# Pensamientos propios

Creo que ya voy entendiendo el sistema de modulos y el standalone al menos lo que creo, el standalone lo que nos permite es tener los mismos importes como si fuera en un @ngModule o algo asi, ya se me olvido

# Importacion De Componentes En Angular

La importacion de componentes en angular al menos en la ultima version permite importarlo en ponerlo en componentes padres, solo hace falta importar ese componente en los imports de la metadata del componente padre

```ts
@Component({
    selector: "app-padre",
    imports: [ ComponenteHijo ]
    standalone: true
})
```

# Routing Angular 19

Para el routing se necesita el archivo app.route.ts, aqui se definiran las rutas, muy similar a react router doom para ser especificos tiene la misma sintaxis y se espera la ruta principal junto al componente o la ruta, el router de todas la paginas `404` se hacen con `**` para las paginas que no se encuentran

De lo demas la sintaxis de las rutas en angular 19 es practicamente igual a las rutas react router dom

**Ejemplo**

```ts
import HomeRoute from "./routes/homeroute/home.component.ts"

export const routes: Routes = [
    {path: "", component HomeRoute}
            |                 |
            |                 |
          "Path"          "Component"
]
```

## ⚙ Propiedades de Routing

`loadComponent`: Lazy load de el routing

## @For y @Empty en Angular 19

En angular 19 la sintaxis es muy similiar a la del metodo `map` en React a diferencia que se ve un poco mas organizado y con un metodo bastante sencillo pero bastante util que es el `@empty`, el nombre ya describe como tal que es lo que tiene que hacer.

**Ejemplo de uso**

```ts
@for (item of items; track item.name ; let indice = $index){
    <li> {{indice + 1}} {{item.name}}</li>
}@empty {
    <li>{{"Esto saldra cuando no haya nada para renderizar"}}</li>
}
```

**✅ Output True | @for**

```
                        ┌─────────┬──────────┬─────────┐
                        │ (index) │ Indice   │ Nombre  │
                        ├─────────┼──────────┼─────────┤
                        │    0    │    1     │ Manzana │
                        │    1    │    2     │ Banana  │
                        │    2    │    3     │ Cereza  │
                        └─────────┴──────────┴─────────┘

```

**❌Output False | @empty**

```
            ┌─────────────────────────────────────────────────────────┐
            │            Esto saldrá cuando no haya data              │
            └─────────────────────────────────────────────────────────┘
```

> [!TIP]
> Se podria decir que es practicamente el key que se le dan en los mapeos a las grandes en los bucles o listas, mejora el rendimiento de la web considerable mente, dando _id_ unicos para que cuando se haga un cambio angular o el framework pueda encontrar facilmente que fue lo que cambio por medio de los **id**.

## Entradas @Input - property Biding

Se da por medio del decorador `@Input` que nos permite pasar comunicacion o relacion de un componente a otro componente, la sitanxis se crear dentro de la clase como si fuera una propiedad o `prop` y siempre esperara una entrada como tal. Es imporntante inicilizarla porq esto es TS y sobre todo tiparla.

**Ejemplo de uso**

**<font color="#3178c6">son.component.ts</font>**

```ts
export default class SonComponent {
  @Input() message: string = "Hola si no me mandan parametros";
}
```

**<font color="#3178c6">father.component.ts</font>**

```ts
import SonComponent from "./sonComponent/son.component.ts"
import {Component} from "@angular/core"

@Component({
    selector: "father-component",
    imports: [ SonComponent ]
})
```

**<font color="#e34f26">father.component.html</font>**

```html
<main>
  <!-- Aqui va todo el html del componente padre -->
  <son-component message="Hola este es el mensaje que se manda por props ☢"></son-component>
  <!-- Aqui va todo el html del componente padre -->
</main>
```

## Uso de @defer, @loading, @placeholder

Tengo idea de como funcionan, pero en la practica no me funcionan

## Injectables

Los injectables en angular son una de las cosas mas importantes de el framework para se espeficos, nos permite poner dependecias en tiempo de ejecucion, una dependecia pordria ser un servicio, por ejemplo un modulo de angular, o una peticion a una api

Es recomendable poner los Injectables en lugares especificos, podrian ser tales como en el directorio servicio si queremos que ese injectable este en modo global si ese injectable solo se usara en un modulo, se puede poner alli mismo

## Uso ⚙

Para hacer uso de una inyeccion es algo similar a la sintaxis del `useContext()` en react a diferencia que aqui no es para estados **globales**, pero es bueno tener la referencia a que la sintaxis y creacion son similares, y para hacer uso de la inyeccion ya sea de un servicio hay dos maneras de hacerlo, sea con el metodo `inject()` o sea con la sintaxis clasica de angular

`Ventajas del metodo inject`: Sintaxis mas limpia, actualizada y no necesita del metodo constructor

**Ejemplo:**

```ts
import GetCarsService from "../../services/cars.services.ts";

class CarsComponent {
  // No hace falta la ejecucion desde el metodo constructor cuando se inicializa el componente, segun lo que entiendo entonces el metodo inject(), seria buena idea utilizarlo cuando no se necesita ejecutar cuando se inicializa el componente. 🐵

  carsServices = inject(GetCarsService);

  getCar() {
    // Input de la interfaz para ver la salida por medio de ID.
    const idInput = this.form.value.id;
    const rs = this.carsServices.getCar(idInput);
    // Ver el resultado de la peticion en un alerta
    window.alert(rs);
  }
}
```

> [!IMPORTANT]  
> Es importante tener en cuenta si la peticion es un observable, y, que devuelve un observable se debe tipar ese observable y este observable dara el nuevo flujo con su subscribe que sera diferente como se muestra en el ejemplo anterior.

`Ventajas de La Sintaxis Clasica ` : Sintaxis un poco mas verbosa pero mas utilizada en proyectos sea nuevo como anteriore|s , ademas que hace uso del metodo constructor.

```ts
// Here code ....
```

<!-- ### FormBuilder, FormGroup -->

## Renderizado de Imagenes en Angular

### Uso de las imagenes

Las imagenes en angular se cargan por lo general en el documento assets, o mejor dicho verificar las configuraciones de angular en **angular.json** y verificar, En Angular 19 al menos las configuraciones de las imagenes se encuentran en la carpeta public y para acceder a alguna de las imagenes de esta carpeta se haria de la siguiente manera:

```html
<img src="/dog.png" />
|
<!-- Ruta absoluta de la imagen desde ruta absoluta, angular la reconocera y la configurara enseguida para desarrollo y producccion -->
```

### Optimizacion de las imagenes

app.component.ts

```ts

import {NgOptimizedImage} from "@angular/common"

@Component({
    imports: [NgOptimizedImage]
})
```

app.component.html

```html
<img ngSrc="/dog.png" priority />
```
Remplazar `src` por `ngSrc`
# pelu



### Las Fuentes en 🅰ngular

Las fuentes en angular se instalan exactamente igual, como si no hubiera un framework, yo al menos los trabaje desde el mismo `CSS` 

__Ejemplo de uso CSS__


```css

/* Exactamente igual se instalan las fuentes en angular, Desde CSS */
@font-face {
    font-family: 'Ubuntu';
    src: url('/fonts/Ubuntu-Bold.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'Ubuntu';
    src: url('/fonts/Ubuntu-BoldItalic.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }
  
  @font-face {
    font-family: "Ubuntu" ;
    src: url("/fonts/Ubuntu-Regular.ttf") format("truetype");
    font-weight: 600 ;
  }
  
  @font-face {
    font-family: 'Ubuntu';
    src: url('/fonts.woff2') format('truetype');
    font-weight: 700;
    font-style: italic;
  }
  
  @font-face {
    font-family: 'Ubuntu';
    src: url('/fonts/Ubuntu-Light.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: "Ubuntu";
    src: url("/fonts/Ubuntu-Medium.ttf") format("truetype");

  }
```

### Navegacion sin Reload

La navegacion en angular tmb depende de como estes utilizando los modules o en `standalone` modulos, si estas utilizando standalone es imporante tener en cuenta que si el html no te reconoce esa propiedad entonces necesitas importar RouterModule en ese component. Y al igual que en `react-router-dom` este cambio de paignas como tal no hace un reload o refresh en la pagina


Ejemplo de etiqueta a sin recarga de pagina

```html
<a routerLink="/ruta_aqui" >Redireccion</a>
```

### Modales

Para las modales en este proyecto estoy haciendo uso de la libreria Swal para que me cree las modales y no tener ese monton de modales de mal humor


__Ejemplo de uso sencillo de la Libreria Swal y su metodo Fire__

```ts
import Swal from "sweetalert2"

if (this.formulario.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor rellene los campos correctamente',
        icon: 'error',
        confirmButtonText: 'Cool',
      });
    } else:
      // Logica aqui...
```


### Redireccionamiento Dinamico con Angular

Las redirreciones dinamicas en angular se pueden hacer a traves del metodo del modulo router, con el modulo navigate o con el navigateBy, para las redirecciones dinamicas

....

### Validaciones Input por HTML estilizadas con Ng CLasss

Las validaciones por input en html estilidas con ng class las hize haciendo uso de un metodo submit que valida clave por clave de los controles y inserta la clave del control en un nuevo objecto donde estas las validaciones en estado falso para despues en la pantalla mostrarlas en rojo, es un simple objecto que contiene la clave con un estado booleano en true, que permite sabe si esa validacion es falsa.

### Validacion por Envio de formulario


### Metodos de modulo HttpClient

pipe: 
subscribe:
forEach
