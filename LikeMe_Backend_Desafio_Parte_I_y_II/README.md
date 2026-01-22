# Like Me Backend (Parte I + Parte II)

API REST con Node + Express + PostgreSQL (pg) para la app **Like Me**.

## Instalación
```bash
npm install
npm run dev
```

## SQL (crear base y tabla)
```sql
CREATE DATABASE likeme;
\c likeme;

CREATE TABLE posts (
  id SERIAL,
  titulo VARCHAR(25),
  img VARCHAR(1000),
  descripcion VARCHAR(255),
  likes INT
);
```

## Endpoints
- **GET** `/posts` -> lista posts
- **POST** `/posts` -> crea post (body: titulo, url, descripcion)
- **PUT** `/posts/like/:id` -> suma 1 like
- **DELETE** `/posts/:id` -> elimina post

## Manejo de errores (Parte II)
- Se usa **try/catch** en las rutas para capturar errores de consultas SQL con `pg`.
- Se devuelve **404** cuando no existe el post a modificar/eliminar.
