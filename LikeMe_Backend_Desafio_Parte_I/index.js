require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getPosts, createPost, likePost, deletePost } = require("./queries");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/posts", async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;
    if (!titulo || !url || !descripcion) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const post = await createPost({ titulo, url, descripcion });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/posts/like/:id", async (req, res) => {
  const post = await likePost(req.params.id);
  res.json(post);
});

app.delete("/posts/:id", async (req, res) => {
  await deletePost(req.params.id);
  res.json({ message: "Post deleted" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
