const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middleware/auth'); 

const recipeController = require('../controllers/recipeController')

router.post('/createRecipe',ensureAuthenticated , recipeController.createRecipe); //createRecipe somente autenticado
router.get('/getRecipes',recipeController.getRecipes);
router.get('/:id', recipeController.getRecipeById)


module.exports = router;