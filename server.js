require('dotenv').config()

const app = require('./app') // importa o arquivo app.js
const mongoose = require('mongoose')

//Credentials
const dbUser = 'devfabriciodag'
const dbPassword = 'kBVkl7KpQK1gxAJo' // mover para o .env


mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.pqilv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>{
    console.log('Conectou ao banco')
    const PORT = 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(error => console.error('Database connection error:', error));