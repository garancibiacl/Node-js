# Desafío Soft Jobs — Full Stack (React + Node/Express + PostgreSQL + JWT)

Proyecto full stack con:
- Frontend: React + Vite
- Backend: Node + Express
- Base de datos: PostgreSQL (local o Supabase)
- Autenticación: JWT + bcrypt

## Endpoints backend
- `POST /usuarios` registra usuario
- `POST /login` inicia sesión y retorna token
- `GET /usuarios` obtiene perfil (requiere `Authorization: Bearer <token>`)

## Requisitos
- Node.js 18+ (recomendado 20+)
- npm
- Base de datos PostgreSQL (local o Supabase)

## 1) Instalar dependencias
Desde la raíz del proyecto:

```bash
npm install
npm run install:all
```

## 2) Configurar variables de entorno
Crear `backend/.env`:

```env
PORT=3000
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/softjobs
JWT_SECRET=super_secreta_cambia_esto
JWT_EXPIRES_IN=1h
TEST_EMAIL=test@softjobs.com
TEST_PASSWORD=123456
```

## 3) Configurar base de datos

### Opción A: PostgreSQL local
Ejecutar script:

```bash
cd backend
psql -U <TU_USUARIO> -f script.sql
```

### Opción B: Supabase (recomendada si no tienes Postgres local)
1. Crear proyecto en Supabase.
2. Ir a `Connect` y copiar `Connection string` (URI).
3. Usar esa URI en `DATABASE_URL` dentro de `backend/.env`.
4. Crear la tabla `usuarios` en `SQL Editor`:

```sql
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(60) NOT NULL,
  rol VARCHAR(25),
  lenguage VARCHAR(20)
);
```

## 4) Ejecutar el proyecto
Desde la raíz:

```bash
npm run dev
```

Servicios:
- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173` (o el puerto que muestre Vite)

## 5) Pasos para probar el desafío
1. Ir al formulario `Registrar nuevo usuario`.
2. Registrar con:
   - Email: `test@softjobs.com`
   - Password: `123456`
   - Rol: `Full Stack Developer`
   - Lenguaje: `JavaScript`
3. Ir a `Iniciar Sesión` y entrar con el mismo email/password.
4. Ir a `Mi Perfil` y validar datos del usuario.

## 6) Usuario semilla (opcional)
Para crear/actualizar usuario de prueba desde backend:

```bash
cd backend
npm run seed
```

Credenciales:
- Email: `test@softjobs.com`
- Password: `123456`

## 7) Estructura
```txt
softjobs-fullstack/
  backend/
  frontend/
  package.json
  README.md
```
