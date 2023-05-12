const express = require('express');
const Router = express.Router();
const Article = require('../models/article')


Router.get('/new',(req,res)=>{
    res.render('article/new')
})
// update 
Router.get('/edit/:id',async (req,res)=>{
   const article_date = await Article.findById({_id:req.params.id})
   res.render('article/edit',{article:article_date})
})

Router.post('/edit/:id',async(req,res)=>{
   const article= await  Article.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
            res.redirect('/')

 })
 

//new form view
Router.get('/:slug',async (req,res)=>{
    const article = await Article.findOne({slug:req.params.slug})
    if(article==null){res.redirect('/')}
    res.render('article/show',{article:article})
})

Router.post('/',(req,res)=>{
    const article = new Article({
        title:req.body.title,
        des:req.body.des,
        info:req.body.info
    })
    article.save().then(()=>{
        res.redirect(`/`)
    })
})
//delete
/*Router.get('/delete/:id',async (req,res)=>{
    const article= await Article.findByIdAndDelete({_id:req.params.id},(err)=>{
        if(err){
            res.send('Sory')
        }else{
            res.redirect('/')
        }
    })
})*/
Router.get('/delete/:id',async (req,res)=>{
    const article = await Article.findByIdAndDelete({_id:req.params.id})
    res.redirect('/')
 })

module.exports = Router;