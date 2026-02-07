# Desafío Soft Jobs — Backend (JWT + PostgreSQL)

Servidor Express para **registro**, **login** y **perfil** usando **JWT**, cumpliendo los requisitos del PDF.

## 1) Requisitos
- Node 18+ (ideal)
- PostgreSQL

## 2) Crear DB y tabla
Ejecuta en `psql`:

```sql
CREATE DATABASE softjobs;
\c softjobs;

CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(60) NOT NULL,
  rol VARCHAR(25),
  lenguage VARCHAR(20)
);

SELECT * FROM usuarios;
```

## 3) Variables de entorno
Crea un archivo `.env` en la raíz:

```bash
PORT=3000
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/softjobs
JWT_SECRET=super_secreta_cambia_esto
JWT_EXPIRES_IN=1h
```

> Si usas credenciales separadas, también puedes definir: `PGHOST`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`, `PGPORT`.

## 4) Instalar y levantar
```bash
npm install
npm run dev
# o
npm start
```

### Usuario de prueba (opcional, recomendado)
Para que puedas probar **login + JWT** sin pasar primero por el formulario de registro:

```bash
npm run seed
```

Esto crea/actualiza el usuario:
- **email:** test@softjobs.com
- **password:** 123456

## 5) Endpoints

### POST /usuarios (registro)
Body JSON:
```json
{
  "email": "correo@correo.com",
  "password": "123456",
  "rol": "Full Stack Developer",
  "lenguage": "JavaScript"
}
```

Respuesta (201):
```json
{
  "message": "Usuario creado correctamente",
  "user": { "id": 1, "email": "...", "rol": "...", "lenguage": "..." }
}
```

### POST /login
Body JSON:
```json
{ "email": "correo@correo.com", "password": "123456" }
```

Respuesta (200):
```json
{ "token": "<JWT>" }
```

### GET /usuarios (perfil)
Header:
```
Authorization: Bearer <TOKEN>
```

Respuesta (200):
```json
[
  { "email": "...", "rol": "...", "lenguage": "..." }
]
```

## 6) Qué cumple del desafío
- Registro y obtención desde PostgreSQL
- Contraseñas hasheadas con bcrypt (saltRounds=10)
- Middleware de validación de credenciales
- Middleware de validación de token (Authorization: Bearer ...)
- Logging: requests + consultas SQL en consola
- Manejo de errores con respuestas JSON limpias
