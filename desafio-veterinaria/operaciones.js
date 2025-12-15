const fs = require("fs");

const CITES_PATH = "citas.json";

const safeReadCitas = () => {
  try {
    const raw = fs.readFileSync(CITES_PATH, "utf8");
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      // Si el JSON existe pero no es un arreglo, lo normalizamos
      return [];
    }

    return parsed;
  } catch (error) {
    // Si no existe el archivo o está corrupto, lo inicializamos como []
    try {
      fs.writeFileSync(CITES_PATH, JSON.stringify([], null, 2));
    } catch (_) {}
    return [];
  }
};

const safeWriteCitas = (citas) => {
  fs.writeFileSync(CITES_PATH, JSON.stringify(citas, null, 2));
};

const registrar = (nombre, edad, tipo, color, enfermedad) => {
  try {
    const citas = safeReadCitas();

    const nuevaCita = {
      nombre,
      edad,
      tipo,
      color,
      enfermedad,
    };

    citas.push(nuevaCita);
    safeWriteCitas(citas);

    console.log(" Cita registrada:");
    console.log(nuevaCita);
  } catch (error) {
    console.error("Error registrando la cita:", error?.message ?? error);
  }
};

const leer = () => {
  try {
    const citas = safeReadCitas();

    if (citas.length === 0) {
      console.log("ℹNo hay citas registradas.");
      return;
    }

    console.log("Citas registradas:");
    console.log(citas);
  } catch (error) {
    console.error(" Error leyendo las citas:", error?.message ?? error);
  }
};

module.exports = { registrar, leer };
