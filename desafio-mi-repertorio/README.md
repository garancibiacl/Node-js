# Mi repertorio (Backend)

## Ejecutar
```bash
npm i
npm start
```

Opcional (modo dev con nodemon):
```bash
npm run dev
```

## Probar
1. Abre: http://localhost:3000/
2. Desde la tabla del HTML:
   - Agrega canción (POST /canciones)
   - Edita canción (PUT /canciones/:id)
   - Elimina canción (DELETE /canciones/:id)
3. Verifica listado (GET /canciones)

El archivo `repertorio.json` queda persistido en la raíz del proyecto.
