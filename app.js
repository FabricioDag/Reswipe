const express = require('express')
const cors = require("cors");

const app = express()

app.use(express.json()); // compreender json
app.use(express.urlencoded({ extended: true })); //??
app.use(cors({ origin: "http://localhost:5173" })); // ou link render

app.get("/api", (req, res) => {
    res.json({ message: "Hello from the backend!" });
  });

app.use('/auth', require('./routes/authRoutes'));
app.use('/recipes', require('./routes/recipeRoutes'));
app.use('/posts', require('./routes/postRoutes'));
// users
// badges

module.exports = app;