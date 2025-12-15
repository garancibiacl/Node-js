const { registrar, leer } = require("./operaciones");

// Basado en la guía: capturar argumentos desde la terminal con process.argv.slice(2)
const args = process.argv.slice(2);
const operacion = args[0];

const printHelp = () => {
  console.log(`
Uso:
  node index.js registrar <nombre> <edad> <tipo> <color> <enfermedad>
  node index.js leer

Ejemplos:
  node index.js registrar Benito "2 años" perro blanco vomitos
  node index.js leer
`);
};

if (!operacion) {
  printHelp();
  process.exit(1);
}

// Desafío pide condiciones para decidir según el argumento (registrar / leer). :contentReference[oaicite:2]{index=2}
if (operacion === "registrar") {
  const nombre = args[1];
  const edad = args[2];
  const tipo = args[3];
  const color = args[4];
  const enfermedad = args[5];

  // Validación mínima (robusta pero simple)
  if (![nombre, edad, tipo, color, enfermedad].every(Boolean)) {
    console.log("Faltan argumentos para registrar.");
    printHelp();
    process.exit(1);
  }

  registrar(nombre, edad, tipo, color, enfermedad);
}

if (operacion === "leer") {
  leer();
}

if (operacion !== "registrar" && operacion !== "leer") {
  console.log(`Operación desconocida: ${operacion}`);
  printHelp();
  process.exit(1);
}
