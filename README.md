# Clean Architecture Node.js

## Descripción del proyecto

Este proyecto es una aplicación básica en **Node.js** construida utilizando el patrón de diseño **Clean Architecture**.

El objetivo principal del proyecto es mostrar un mensaje en consola, pero organizando el código de una forma modular, ordenada y escalable.

El mensaje que muestra la aplicación es:

```bash
Hola profe
```

Aunque el programa es simple, la estructura permite entender cómo se divide una aplicación usando Clean Architecture.

---

## ¿Qué es Clean Architecture?

**Clean Architecture** es un patrón de diseño que organiza el código en diferentes capas.

Cada capa tiene una responsabilidad específica dentro del sistema. La idea principal es separar la lógica importante del proyecto de los detalles técnicos externos.

En otras palabras, Clean Architecture busca que la parte más importante de la aplicación no dependa directamente de cosas como:

- La consola.
- Una base de datos.
- Un framework.
- Una API externa.
- Una interfaz gráfica.
- Librerías externas.

Esto permite que el proyecto sea más fácil de mantener, modificar y escalar.

---

## ¿Por qué se usó Clean Architecture en este proyecto?

Se usó Clean Architecture para demostrar cómo se puede organizar un proyecto desde una etapa inicial, incluso si la funcionalidad actual es simple.

En vez de escribir todo el código en un solo archivo como este:

```js
console.log("Hola profe");
```

Se separó el proyecto en capas:

```txt
domain
application
interfaces
infrastructure
main.js
```

De esta manera, cada parte del código tiene una responsabilidad clara.

Esto permite que en el futuro el proyecto pueda crecer sin quedar desordenado.

---

## Estructura del proyecto

La estructura utilizada es la siguiente:

```txt
clean-architecture-node/
├── package.json
├── README.md
└── src/
    ├── application/
    │   └── GetMessageUseCase.js
    ├── domain/
    │   └── entities/
    │       └── Message.js
    ├── infrastructure/
    │   └── MessageRepository.js
    ├── interfaces/
    │   └── MessageController.js
    └── main.js
```

---

## Explicación de las carpetas

### 1. `domain`

La carpeta `domain` representa el centro de la aplicación.

Aquí se encuentra la lógica más importante del sistema. En este proyecto, el dominio contiene la entidad `Message`.

Una entidad representa un concepto principal del sistema. En este caso, el concepto principal es un mensaje.

Archivo:

```txt
src/domain/entities/Message.js
```

Ejemplo:

```js
class Message {
  constructor(text) {
    if (!text) {
      throw new Error("El mensaje no puede estar vacío");
    }

    this.text = text;
  }

  getText() {
    return this.text;
  }
}

export default Message;
```

Esta clase se encarga de representar un mensaje y validar que no esté vacío.

La capa `domain` no debería depender de las otras capas. Esto es importante porque el dominio debe mantenerse independiente de detalles externos.

---

### 2. `application`

La carpeta `application` contiene los casos de uso de la aplicación.

Un caso de uso representa una acción que el sistema puede realizar.

En este proyecto, el caso de uso es obtener el mensaje.

Archivo:

```txt
src/application/GetMessageUseCase.js
```

Ejemplo:

```js
class GetMessageUseCase {
  constructor(messageRepository) {
    this.messageRepository = messageRepository;
  }

  execute() {
    const message = this.messageRepository.getMessage();

    return message.getText();
  }
}

export default GetMessageUseCase;
```

Esta clase no crea directamente el mensaje. En vez de eso, recibe un repositorio y le pide el mensaje.

Esto permite separar la lógica de aplicación de los detalles técnicos.

---

### 3. `infrastructure`

La carpeta `infrastructure` contiene detalles técnicos externos.

En una aplicación real, aquí podrían ir:

- Conexiones a bases de datos.
- Repositorios.
- Servicios externos.
- Archivos de configuración.
- APIs.
- Implementaciones técnicas.

En este proyecto, `MessageRepository` es el encargado de entregar el mensaje.

Archivo:

```txt
src/infrastructure/MessageRepository.js
```

Ejemplo:

```js
import Message from "../domain/entities/Message.js";

class MessageRepository {
  getMessage() {
    return new Message("Hola profe");
  }
}

export default MessageRepository;
```

Esta capa conoce cómo obtener o construir el mensaje.

Si más adelante el mensaje viniera desde una base de datos, desde un archivo o desde una API, ese cambio se haría principalmente en esta capa.

---

### 4. `interfaces`

La carpeta `interfaces` se encarga de comunicar la aplicación con el exterior.

Aquí pueden existir:

- Controladores.
- Rutas.
- Presentadores.
- Adaptadores de entrada.
- Adaptadores de salida.

En este proyecto, `MessageController` se encarga de ejecutar el caso de uso y mostrar el resultado.

Archivo:

```txt
src/interfaces/MessageController.js
```

Ejemplo:

```js
class MessageController {
  constructor(getMessageUseCase) {
    this.getMessageUseCase = getMessageUseCase;
  }

  showMessage() {
    const message = this.getMessageUseCase.execute();

    console.log(message);
  }
}

export default MessageController;
```

El controlador no contiene la lógica principal del negocio. Su función es coordinar la ejecución y mostrar el resultado.

---

### 5. `main.js`

El archivo `main.js` es el punto de entrada de la aplicación.

Aquí se conectan todas las capas.

Archivo:

```txt
src/main.js
```

Ejemplo:

```js
import MessageRepository from "./infrastructure/MessageRepository.js";
import GetMessageUseCase from "./application/GetMessageUseCase.js";
import MessageController from "./interfaces/MessageController.js";

const messageRepository = new MessageRepository();

const getMessageUseCase = new GetMessageUseCase(messageRepository);

const messageController = new MessageController(getMessageUseCase);

messageController.showMessage();
```

Este archivo se encarga de crear las instancias necesarias y ejecutar el programa.

---

## Flujo de ejecución del proyecto

El flujo de ejecución es el siguiente:

```txt
main.js
   ↓
MessageController
   ↓
GetMessageUseCase
   ↓
MessageRepository
   ↓
Message
```

Explicación del flujo:

1. `main.js` inicia la aplicación.
2. Se crea una instancia de `MessageRepository`.
3. Se crea una instancia de `GetMessageUseCase`.
4. Se crea una instancia de `MessageController`.
5. El controlador ejecuta el caso de uso.
6. El caso de uso obtiene el mensaje desde el repositorio.
7. El repositorio crea una entidad `Message`.
8. La entidad valida y entrega el texto.
9. El controlador muestra el mensaje en consola.

---

## Principio principal de Clean Architecture

El principio más importante de Clean Architecture es que las dependencias deben apuntar hacia el centro del sistema.

Esto significa que las capas externas pueden depender de las capas internas, pero las capas internas no deberían depender de las externas.

Forma correcta:

```txt
interfaces → application → domain
infrastructure → domain
```

Forma incorrecta:

```txt
domain → infrastructure
domain → interfaces
```

El dominio debe mantenerse independiente porque representa la parte más importante del sistema.

---

## ¿Por qué no poner todo en un solo archivo?

Para un proyecto pequeño, se podría hacer simplemente esto:

```js
console.log("Hola profe");
```

Eso funciona, pero no demuestra una arquitectura limpia.

La finalidad de este proyecto no es solo mostrar un mensaje, sino mostrar cómo se puede organizar una aplicación usando buenas prácticas.

Con Clean Architecture, el código queda separado por responsabilidades:

```txt
Message.js              → representa el mensaje
MessageRepository.js    → obtiene o construye el mensaje
GetMessageUseCase.js    → ejecuta la acción principal
MessageController.js    → coordina y muestra el resultado
main.js                 → inicia la aplicación
```

---

## Beneficios de usar Clean Architecture

### 1. Orden

El proyecto queda mejor organizado.

Cada carpeta tiene una responsabilidad clara.

---

### 2. Separación de responsabilidades

Cada archivo cumple una función específica.

Esto evita mezclar lógica de negocio, lógica de aplicación y detalles técnicos en un mismo lugar.

---

### 3. Escalabilidad

El proyecto puede crecer sin perder orden.

Por ejemplo, más adelante se podrían agregar nuevos casos de uso como:

```txt
CreateMessageUseCase.js
UpdateMessageUseCase.js
DeleteMessageUseCase.js
```

También se podrían agregar nuevas entidades, controladores o repositorios.

---

### 4. Mantenibilidad

Si hay que modificar una parte del sistema, es más fácil encontrar dónde hacer el cambio.

Por ejemplo, si el mensaje cambia, se puede modificar el repositorio.

Si cambia la forma de mostrar el mensaje, se puede modificar el controlador.

Si cambia la regla del mensaje, se puede modificar la entidad.

---

### 5. Independencia de tecnologías externas

La lógica principal no queda atada a una tecnología específica.

Por ejemplo, hoy el mensaje se muestra en consola, pero en el futuro podría mostrarse en:

- Una API REST.
- Una página web.
- Una aplicación móvil.
- Una base de datos.
- Un archivo externo.

La arquitectura permite hacer esos cambios sin modificar todo el sistema.

---

### 6. Facilidad para trabajar en equipo

Al tener carpetas separadas, cada integrante puede trabajar en una parte específica del proyecto.

Por ejemplo:

- Una persona puede trabajar en `domain`.
- Otra persona puede trabajar en `application`.
- Otra persona puede trabajar en `interfaces`.
- Otra persona puede trabajar en `infrastructure`.

Esto ayuda a evitar desorden y conflictos en el código.

---

## Ejecución del proyecto

Para ejecutar el proyecto se utiliza el siguiente comando:

```bash
npm start
```

El resultado esperado en consola es:

```bash
Hola profe
```

---

## Configuración del `package.json`

El archivo `package.json` debe tener un script `start` para ejecutar el proyecto:

```json
{
  "name": "cleanarchitecture_tarea2",
  "version": "1.0.0",
  "description": "Proyecto Hola Mundo usando Clean Architecture en Node.js",
  "type": "module",
  "main": "src/main.js",
  "scripts": {
    "start": "node src/main.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

---

## Observación importante sobre el controlador

En Clean Architecture, el archivo `MessageController.js` debería tener la responsabilidad de coordinar la ejecución del caso de uso y mostrar el resultado.

El controlador no debería crear directamente el mensaje ni actuar como repositorio.

La responsabilidad correcta sería:

```txt
MessageController.js → llama al caso de uso y muestra el resultado
MessageRepository.js → obtiene o construye el mensaje
GetMessageUseCase.js → ejecuta la acción principal
Message.js → representa y valida el mensaje
```

---

## Conclusión

Este proyecto utiliza Clean Architecture para organizar una aplicación simple en Node.js.

Aunque solo muestra un mensaje en consola, el código está dividido en capas para demostrar buenas prácticas de arquitectura.

La estructura permite separar responsabilidades, mantener el código ordenado y preparar el proyecto para futuras funcionalidades.

Clean Architecture ayuda a que el dominio y la lógica principal del sistema no dependan directamente de detalles técnicos externos, lo que hace que el proyecto sea más mantenible, escalable y fácil de modificar.
