require('dotenv').config()

const app = require('./app') // importa o arquivo app.js
const mongoose = require('mongoose')


//Credentials
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS 


mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.pqilv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>{
    console.log('Conectou ao banco')
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(error => console.error('Database connection error:', error));