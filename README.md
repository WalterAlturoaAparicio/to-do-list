# 📝 To-Do List App
App simple para gestionar tareas en tiempo real usando Express, SQLite, Sequelize y Socket.IO. Ideal para testear features como WebSockets y persistencia ligera.

La aplicación está diseñada siguiendo una estructura modular y escalable, separando responsabilidades por dominio funcional (DDD).

### 🚀 Requisitos
> Node.js >= 18

npm o yarn

### ⚙️ Configuración
Clona el repo:

```bash
git clone https://github.com/tu-usuario/to-do-list.git
cd to-do-list
```
Instala las dependencias:
```bash
npm install
```
Configura las variables de entorno:

```bash
cp .env.sample .env
```
Luego edita el archivo .env:
```env
PORT=3000
STORAGE=db.sqlite
```
(Opcional) Crea la base de datos manualmente si se está usando SQLite puro:

Lanza el servidor con hot reload:

```bash
npm run start:dev
```
> Accede desde tu navegador en http://localhost:3000.

## 🧠 Endpoints
GET / → Página básica de bienvenida (sirve index.html)

GET /tasks → Lista las tareas

POST /tasks → Crea una tarea

PUT /tasks/:id → Actualiza una tarea

DELETE /tasks/:id → Elimina una tarea

WebSocket integrado en el mismo puerto

## 📂 Estructura básica
```lua
src/
├── config/
│   ├── database.js
│   ├── config.js
│   └── io.js
├── task/
│   ├── task.service.js
│   ├── task.controller.js
│   ├── task.router.js
│   └── task.model.js
├── index.js
├── index.html
.env
```

## Consideraciones
- ```task/```  sigue una arquitectura MVC ligera:
- ```config.js``` centraliza el acceso a variables de entorno y define valores por defecto. Esto evita el uso directo de ```process.env``` en todo el código, facilita el mantenimiento y asegura que la app siga funcionando incluso si faltan variables en el entorno.
-  ```io.js ``` encapsula la instancia de Socket.io para inicializarla una sola vez y reutilizarla en toda la app. Esto evita dependencias circulares, mejora la organización y permite acceder al socket desde cualquier módulo de forma segura.
