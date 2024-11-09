require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

//config json
app.use(express.json())

//models
const User = require('./models/User.js')


// public route
app.get('/',(req,res)=>{
    res.status(200).json({msg:'bem vindo'})
})

//private route
app.get('/user/:id',checkToken,async (req,res)=>{
    const id = req.params.id

    // check if user exists
    const user = await User.findById(id,'-password')

    if(!user){
        res.status(424).json({msg:'usuario nao encontrado'})
    }

    res.status(200).json({user})
    
})

function checkToken(req, res, next){

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        res.status(401).json({msg:'ACESSO NEGADO'})
    }

    try{

        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()

    }catch(error){
        res.status(400).json({msg:'Token inválido'})
    }

}

//registro usuario
app.post('/auth/register', async(req,res)=>{

    const{name, email, password, confirmpassword, birthdate} = req.body

    if(!name){
        return res.status(422).json({msg:'o nome é obrigatório'})
    }

    if(!email){
        return res.status(422).json({msg:'o email é obrigatório'})
    }

    if(!password){
        return res.status(422).json({msg:'a senha é obrigatório'})
    }

    if(!birthdate){
        return res.status(422).json({msg:'a data é obrigatório'})
    }

    if (password !== confirmpassword){
        return res.status(422).json({msg:'As senhas nao conferem'})
    }

    // check if user exists
    const userExists = await User.findOne({email:email})

    if(userExists){
        return res.status(422).json({msg:" email ja cadastrado"})
    }

    //create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    //create user
    const user = new User({
        name,
        email,
        password: passwordHash,
        birthdate,
    })

    try{

        await user.save()

        res.status(201).json({msg:'Usuario criado com sucesso'})

    }catch(error){
        console.log(error)
        res.status(500).json({msg:error})
    }
})

//login usuario
app.post('/auth/login', async(req,res)=>{
    const {email, password} =  req.body

    if(!email){
        return res.status(422).json({msg:'o email é obrigatório'})
    }

    if(!password){
        return res.status(422).json({msg:'a senha é obrigatório'})
    }

    // check if user exists
    const user = await User.findOne({email:email})

    if(!user){
        return res.status(404).json({msg:" email nao cadastrado"})
    }

    // check se senhas coincidem
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword){
        return res.status(422).json({msg:" senha inválida"})
    }

    try{

        const secret = process.env.SECRET

        const token = jwt.sign({
            id:user._id,      
        },
        secret,
    )

    res.status(200).json({msg:" Autenticação deu certo", token})

    }catch(error){
        console.log(error)
        return res.status(422).json({msg:" Algo deu errado tente mais tarde"})
    }
})


//Credentials
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS


mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.pqilv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
    app.listen(3000)
    console.log('Conectou ao banco')
}).catch((err)=> console.log(err))

