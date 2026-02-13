# Desafío Cafetería Nanacao - Tests API

## Contexto
Este proyecto contiene una API REST en **Node.js + Express** para gestionar cafés en la ruta `/cafes`.

El objetivo del desafío fue implementar pruebas de rutas HTTP usando:
- **Jest**
- **Supertest**

Las pruebas se ejecutan sobre la app de Express **sin levantar el servidor manualmente**.

## Qué se valida
En `tests/server.spec.js` se validan 4 casos:
- `GET /cafes` responde `200` y retorna un arreglo con al menos 1 objeto.
- `DELETE /cafes/:id` con id inexistente responde `404` (enviando header `Authorization`).
- `POST /cafes` agrega un café y responde `201`.
- `PUT /cafes/:id` con id de parámetro distinto al id del payload responde `400`.

## Cómo correr el proyecto
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Ejecutar pruebas:
   ```bash
   npm test
   ```

Si todo está correcto, verás `PASS` con los 4 tests aprobados.
