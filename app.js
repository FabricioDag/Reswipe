const express = require('express')

const app = express()

app.use(express.json()); // compreender json
app.use(express.urlencoded({ extended: true })); //??

app.use('/auth', require('./routes/authRoutes'));
// app.use('/recipes', require('./routes/recipeRoutes'));

module.exports = app;