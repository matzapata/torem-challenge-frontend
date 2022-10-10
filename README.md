# Prueba Técnica Front End - Chatter

<hr />

## Estructura del proyecto

```
.
├── .next
├── public
├── src
│   ├── assets
│   │   └──
│   ├── components
│   │   └── ...
│   ├── layout
│   │   └── ...
│   ├── pages
│   │   └── ...
│   ├── redux
│   │   └── ...
│   ├── types
│   │   └── ...
│   ├── utils
│   │   └── ...
│   ├── App.css
│   ├── App.test.css
│   ├── index.css
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── .gitignore
├── next-env.d.ts
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
└── tsconfig.tsbuildinfo
```

<hr />

## Correr el cliente

- Utilizar `npm run dev` para correr en development.

## Consigna

Chatter es una app de mensajes, muy parecida a WhatsApp u otras aplicaciones de mensajería. Dentro de ella, existen usuarios capaces de ser registrados, iniciar sesión y a su vez mandar mensajes a distintas personas.

El objetivo de esta evaluación es construir por encima de un maquetado establecido y conectar el cliente con una API REST. La API se puede acceder mediante el siguiente repositorio: https://github.com/toremsoftware/chatter_api

Para correrla, basta con clonar el repositorio, abrir una nueva terminal en la carpeta y escribir el comando `npm start`. Este comando levantará la aplicación en el puerto local 8080 y se le puede consultar mediante la URL: http://localhost:8080.

No hace falta modificar ni alterar ningún archivo del repositorio. Todas las instrucciones para el uso de los endpoints, sockets y respuestas a las consultas http se encuentran en el archivo `README.md`.

## Evaluación

Se deben completar todas las secciones que estén marcadas como `TODO`. Entre ellas están el inicio de sesión, registrarse, enviar mensaje, obtener los mensajes, etc.

Se valora un buen diseño, eficiente y mantenible. No hay problema en crear directorios o archivos para ayudarse si se considera necesario.

## Tests

Se deben realizar los test en [cypress](https://www.cypress.io) que se consideren necesarios para testear la funcionalidad de **enviar mensaje**.

## Tecnologías

- React
- Next.js
- Redux
- Typescript
- Styled components
- Axios
