// controllers/recipeController.js
const Recipe = require('../models/Recipe')

const createRecipe = async(req, res) => {
    
    const { title, description, ingredients, instructions } = req.body;

    //create recipe
    const recipe = new Recipe({
        title,
        description,
        author: req.user.userId, // Referência ao ID do usuário autenticado (teste)
        ingredients,
        instructions
    });

    try{

        await recipe.save()

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
