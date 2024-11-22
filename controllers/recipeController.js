// controllers/recipeController.js
const Recipe = require('../models/Recipe')
const User = require("../models/User")

const createRecipe = async(req, res) => {
    
    const { title, description, ingredients, instructions } = req.body;

    // Validações básicas
    if (!title || !description || !ingredients || !instructions) {
        return res.status(400).json({ msg: "Todos os campos são obrigatórios." });
    }

    // Criação da receita com o ID do usuário autenticado
    const recipe = new Recipe({
        title,
        description,
        ingredients,
        instructions,
        createdBy: req.user.id, // Pegando o ID do autor do req.user
    });

    try{

        const savedRecipe = await recipe.save();

        // Atualiza o usuário para adicionar a receita ao array 'recipes'
        await User.findByIdAndUpdate(
            req.user.id, // ID do autor
            { $push: { recipes: savedRecipe._id } }, // Adiciona a receita ao array 'recipes'
            { new: true } // Retorna o documento atualizado
        );

        res.status(201).json({msg:'Receita criada com sucesso'})

    }catch(error){
        console.log(error)
        res.status(500).json({msg:error})
    }

};

const getRecipes = async (req, res) => {
    try {
        // Busca todas as receitas no banco de dados
        const recipes = await Recipe.find().populate('createdBy', 'name email');
        res.status(200).json(recipes);
    } catch (error) {
        console.error("Erro ao buscar receitas:", error);
        res.status(500).json({ message: "Erro ao obter receitas" });
    }
};

const getRecipeById = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId).populate('createdBy', 'name email');

        if (!recipe) {
            return res.status(404).json({ message: "Receita não encontrada" });
        }

        res.status(200).json(recipe);
    } catch (error) {
        console.error("Erro ao buscar receita:", error);
        res.status(500).json({ message: "Erro ao obter a receita" });
    }
};

module.exports = {
    createRecipe,
    getRecipes,
    getRecipeById,
};
