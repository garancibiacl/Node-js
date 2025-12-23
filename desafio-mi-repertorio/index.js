const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

const repertorioPath = path.join(__dirname, "repertorio.json");

const leerRepertorio = () => {
  try {
    if (!fs.existsSync(repertorioPath)) {
      fs.writeFileSync(repertorioPath, "[]", "utf8");
    }
    const data = fs.readFileSync(repertorioPath, "utf8");
    return JSON.parse(data || "[]");
  } catch (error) {
    // Si el JSON está corrupto o vacío, partimos con arreglo vacío
    return [];
  }
};

const guardarRepertorio = (repertorio) => {
  fs.writeFileSync(repertorioPath, JSON.stringify(repertorio, null, 2), "utf8");
};

// GET / -> servir el front
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// GET /canciones -> listar canciones
app.get("/canciones", (req, res) => {
  const repertorio = leerRepertorio();
  res.json(repertorio);
});

// POST /canciones -> agregar canción
app.post("/canciones", (req, res) => {
  const nuevaCancion = req.body;

  const repertorio = leerRepertorio();
  repertorio.push(nuevaCancion);
  guardarRepertorio(repertorio);

  res.send("Canción agregada con éxito");
});

// PUT /canciones/:id -> editar canción
app.put("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const cancionEditada = req.body;

  const repertorio = leerRepertorio();
  const index = repertorio.findIndex((c) => String(c.id) === String(id));

  if (index === -1) {
    return res.status(404).send("Canción no encontrada");
  }

  repertorio[index] = cancionEditada;
  guardarRepertorio(repertorio);

  res.send("Canción editada con éxito");
});

// DELETE /canciones/:id -> eliminar canción
app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;

  const repertorio = leerRepertorio();
  const index = repertorio.findIndex((c) => String(c.id) === String(id));

  if (index === -1) {
    return res.status(404).send("Canción no encontrada");
  }

  repertorio.splice(index, 1);
  guardarRepertorio(repertorio);

  res.send("Canción eliminada con éxito");
});

app.listen(PORT, () => {
  console.log(`¡Servidor encendido! http://localhost:${PORT}`);
});
