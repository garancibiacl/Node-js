

## Cómo ejecutar

1. Registrar una nueva cita (nombre, edad, tipo de animal, color y motivo):
   ```bash
   node index.js registrar Benito "2 años" perro blanco vomitos
   ```
   Esto agrega la información al archivo `citas.json`. Si falta algún dato, el programa avisa y muestra un recordatorio del formato correcto.

2. Leer todas las citas guardadas:
   ```bash
   node index.js leer
   ```
   Con este comando verá por pantalla la lista completa de pacientes registrados hasta el momento.

La aplicación usa `fs` para escribir y leer el archivo, separa la lógica en `operaciones.js` y recibe los datos como argumentos de consola, tal como pedía el enunciado. 
