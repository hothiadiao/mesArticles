const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const expressLayouts = require('express-ejs-layouts');
const Article = require('./models/article')

//routes
const userRouters = require('./routes/user');


const app =  express();


 
//mongoose connect*

mongoose.connect(process.env.MONGODB_URI).then(() =>{
console.log('Connexion à la base de données réussie');
}).catch((err) => {
    console.log(err.message);
})
/*mongoose.connect('mongodb://localhost:27017/youtubeblog',{
userNewUrlParser:true
})*/

//View engine  
app.use(expressLayouts);
app.set(`view engine`,`ejs`);

//routes
app.get(`/`,async (req,res)=>{
    const article = await Article.find();
    //console.log(article)
    res.render(`index`,{article:article})
})
//body parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//userRouters
app.use('/article',userRouters)

// public folder for css and js
app.use(express.static('public'))
//PORT
const PORT= process.env.PORT || 8080 
app.listen(PORT,()=>{
    console.log(`Working on Port 8080`)
})