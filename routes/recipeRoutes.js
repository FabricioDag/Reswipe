const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/recipeController')

router.post('/postRecipe', recipeController.postRecipe); //post Recipe
router.get('/listRecipes',recipeController.listRecipes);
router.get('/:id', recipeController.getRecipeById)


module.exports = router;