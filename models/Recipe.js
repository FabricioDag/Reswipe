// models/Recipe.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: [{
        type: String,
        required: true
    }],
    instructions: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Recipe', recipeSchema);

/*
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String,
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dataCriacao: { type: Date, default: Date.now },
  score: { type: Number, default: 0 },
  ingredientes: [String],
  modoDePreparo: [String],
  comentarios: [
    {
      usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      comentario: String,
      data: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Recipe', recipeSchema);
*/