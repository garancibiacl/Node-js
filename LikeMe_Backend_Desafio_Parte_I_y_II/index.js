require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getPosts, createPost, likePost, deletePost } = require("./queries");

const app = express();
app.use(cors());
app.use(express.json());

// GET /posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await getPosts();
    return res.json(posts);
  } catch (error) {
    console.error("GET /posts:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// POST /posts
app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;

    // Validación simple (evita errores NOT NULL)
    if (!titulo || !url || !descripcion) {
      return res.status(400).json({
        message: "Faltan campos: titulo, url, descripcion",
      });
    }

    const post = await createPost({ titulo, url, descripcion });
    return res.status(201).json(post);
  } catch (error) {
    console.error("POST /posts:", error);

    // 23502 = violación NOT NULL (según guía)
    if (error.code === "23502") {
      return res.status(400).json({
        message: "Se ha violado la restricción NOT NULL en la base de datos",
      });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
});

// PUT /posts/like/:id  -> sumar like
app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await likePost(id);
    return res.json(updated);
  } catch (error) {
    console.error("PUT /posts/like/:id:", error);

    if (error.code === 404) {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE /posts/:id -> eliminar post
app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deletePost(id);
    return res.json({ message: "Post eliminado con éxito" });
  } catch (error) {
    console.error("DELETE /posts/:id:", error);

    if (error.code === 404) {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server ON: http://localhost:${PORT}`));
