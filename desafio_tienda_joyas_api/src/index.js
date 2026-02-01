require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { router } = require("./routes/joyas.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", router);

app.use((req, res) => res.status(404).json({ message: "Not found" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API Joyas ON: http://localhost:${PORT}`));
