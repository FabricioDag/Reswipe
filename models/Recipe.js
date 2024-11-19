const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {type: String,required: true},
    description: {type: String,required: true},
    ingredients: [{type: String,required: true}],
    instructions: {type: String,required: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
    createdAt: {type: Date,default: Date.now}
    // score: { type: Number, default: 0 },
    // comments
});

module.exports = mongoose.model('Recipe', recipeSchema);
