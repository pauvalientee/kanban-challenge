# Proyecto Kanban de Gestion de Tareas

## Descripcion del Proyecto
Esta aplicacion ha sido desarrollada como respuesta al challenge tecnico de gestion de tareas. El objetivo es centralizar la organizacion del trabajo de una empresa mediante un tablero visual dividido en tres columnas de estado: To Do (Pendiente), Doing (En proceso) y Done (Finalizado). El sistema garantiza la persistencia de los datos y permite una gestion individualizada mediante cuentas de usuario protegidas.

## Tecnologias Utilizadas
Para el desarrollo de la aplicacion se ha seleccionado el siguiente stack tecnologico:

* **Frontend:** Angular 19. Se han utilizado Standalone Components y el nuevo sistema de control de flujo para mejorar el rendimiento y la legibilidad del codigo.
* **Backend:** NestJS. Framework de Node.js que proporciona una arquitectura solida y escalable para la API REST.
* **Base de Datos:** SQL (PostgreSQL/MySQL). Se ha utilizado TypeORM para la comunicacion con la base de datos, cumpliendo con el requisito obligatorio de persistencia SQL.
* **Seguridad:** Implementacion de autenticacion basada en JSON Web Tokens (JWT) con estrategias de Passport.

## Instrucciones de Instalacion y Ejecucion

### Requisitos Previos
* Tener instalado Node.js (version 18 o superior).
* Disponer de un servidor de base de datos SQL activo.

### Configuracion del Backend
1. Acceder al directorio: `kanban-backend`
2. Instalar las dependencias necesarias: `npm install`
3. Crear un archivo `.env` en la raiz de esta carpeta con los datos de conexion a la base de datos (host, puerto, usuario, contraseña y nombre de la base de datos).
4. Iniciar el servicio: `npm run start:dev`

### Configuracion del Frontend
1. Acceder al directorio: `kanban-frontend`
2. Instalar las dependencias necesarias: `npm install`
3. Ejecutar la aplicacion: `ng serve`
4. Acceder mediante el navegador a la direccion: `http://localhost:4200`

## Guia de Pruebas y Funcionalidades
El flujo completo de la aplicacion incluye:

1. **Acceso de Invitado:** Con el fin de agilizar la revision por parte del evaluador, se ha incluido un boton de "Acceso Invitado" en la pantalla de inicio de sesion. Este boton utiliza las credenciales preconfiguradas: admin@test.com / 123.
2. **Generacion de Datos Iniciales (Seed):** El sistema detecta si un usuario no tiene tareas creadas y genera automaticamente tareas de ejemplo para demostrar la funcionalidad del tablero desde el primer acceso.
3. **Acciones de Tareas:** El usuario puede crear nuevas tareas, editar el contenido de las existentes, eliminarlas permanentemente o moverlas entre columnas.
4. **Persistencia Real:** Cualquier cambio realizado se almacena de forma inmediata en la base de datos SQL, manteniendo el estado de la informacion tras recargar el navegador o reiniciar la sesion.
5. **Interfaz Adaptativa:** El diseño es completamente responsive, permitiendo una visualizacion optima tanto en ordenadores de escritorio como en dispositivos moviles.

## Herramientas de Inteligencia Artificial
En cumplimiento con las reglas del challenge, se declara el uso de la herramienta Gemini (Google AI) durante el proceso de desarrollo para las siguientes tareas:
* Diseño de la arquitectura de seguridad y proteccion de rutas mediante JWT.
* Depuracion de errores de tipado en TypeScript y configuracion de ESLint.
* Estructuracion de la logica de persistencia en el backend mediante TypeORM.
* Soporte en la redaccion de la documentacion tecnica y configuracion de entornos de despliegue.

## Limitaciones Conocidas
* El movimiento de tareas entre estados se gestiona mediante controles de accion manual. La funcionalidad de arrastrar y soltar (Drag and Drop) no se encuentra disponible en esta version.
* La aplicacion depende de una conexion activa con el servidor de base de datos para la visualizacion del tablero.

## Despliegue
URL Publica del proyecto: [INTRODUCIR AQUI LA URL DE VERCEL O RENDER]