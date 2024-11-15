const mongoose = require('mongoose')

const User = mongoose.model('User',{
    name:String,
    email:String,
    password:String,
    birthdate:Date,
})

module.exports = User


/*
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  dataNasc: Date,
  dataConta: { type: Date, default: Date.now },
  receitas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  seguidores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  seguindo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  medalhas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medal' }],
  score: { type: Number, default: 0 },
  comentarios: [
    {
      receitaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
      comentario: String,
      data: { type: Date, default: Date.now },
    },
  ],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  postsSalvos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
});

module.exports = mongoose.model('User', userSchema); */