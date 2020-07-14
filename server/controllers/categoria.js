const express = require('express');
const app = express();
const { verificaToken} = require('../middlewares/autenticacion');
const Categoria = require ('../models/categoria');
const _ = require ('underscore');
const errors = require ('../error/error');


app.get('/categoria',verificaToken,(req,res)=>{
    Categoria.find({})
    .sort('nombre')
    .populate('usuario','nombre email')
    .exec((err,categoriaDb) => {
        if (err){
            return errors.error400(err,res)
        };

        res.json({
            categoria:categoriaDb
        });
    });
});

app.get('/categoria/:id',verificaToken,(req,res) => {
    let categoriaId = req.params.id;
    Categoria.findById(categoriaId,(err,categoriaDb) => {
        if (err) {
            return errors.error400(err,res);
        };

        if (categoriaDb) {
            return res.json({
                categoria:categoriaDb
            });
        }; 
    }) 
});

app.post('/categoria',[verificaToken],(req,res) => {
    let body = req.body;
    let id = req.usuario._id
    
    let categoria = new Categoria({
        nombre:body.nombre,
        usuario: id
    });
    
    categoria.save((err,categoriaDb) => {
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        };
        
        res.json({
            ok:true,
            categoria:categoriaDb
        });
    });

});



app.delete('/categoria/:id',(req,res)=>{

})





module.exports = app;