const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthDate: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  // badges: [{ type: Schema.Types.ObjectId, ref: 'Badge' }],
  score: { type: Number, default: 0 },
  // comments: [{ type: String }] // criar model para comment
})

module.exports = mongoose.model('User', userSchema);
