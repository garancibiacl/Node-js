# API Tienda de Joyas (My Precious Spa)

Cumple requerimientos del desafío:
1) Límite de recursos, 2) Filtros, 3) Paginación, 4) Ordenamiento, 5) HATEOAS,
+ middleware de reportes y try/catch.

## Setup
1. Crear BD y tabla con `schema.sql`
2. Crear `.env` desde `.env.example`
3. Instalar y ejecutar

```bash
npm install
npm run dev
```

## Endpoints

### GET /joyas
Query:
- `limits` (o `limit`)
- `page`
- `order_by` (ej: `stock_ASC`)

Ej:
`/joyas?limits=3&page=2&order_by=stock_ASC`

### GET /joyas/filtros
Query opcional:
- `precio_min` (>=)
- `precio_max` (<=)
- `categoria`
- `metal`

Ej:
`/joyas/filtros?precio_min=25000&precio_max=30000&categoria=aros&metal=plata`

## Logs (middleware reportes)
Se registran consultas en: `logs/consultas.log`
