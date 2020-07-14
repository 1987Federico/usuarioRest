const express = require('express');
const app = express();
const { verificaToken} = require('../middlewares/autenticacion');
const Producto = require ('../models/producto');
const errors = require ('../error/error');

app.get('/productos',verificaToken,(req,res) => {
    
    let desde = Number (req.query.desde) || 0;
    let limite = Number (req.query.limite) || 5;
    
    Producto.find({})
    .skip(desde)
    .limit(limite)
    .populate('usuario','nombre email')
    .populate('categoria','nombre')
    .exec((err,productoDb) => {
        if (err){
            return errors.error400(err,res);
        };

        res.json({
            producto:productoDb
        });
    })
});

app.get ('/productos/:id', verificaToken,(req,res) => {
    let id = req.params.id;

    Producto.findById(id)
    .populate('usuario','nombre email')
    .populate('categoria','nombre')
    .exec((err,productoDb) => {
        
        if(err){
            return errors.error500(err,res);
        };

        if(!productoDb){
            return errors.error400Product(err,res,'El producto no existe');
        };

        res.json({
            ok:true,
            producto:productoDb
        });
    })
});

app.post('/productos',[verificaToken],(req,res) => {
    let body = req.body;
    let usuarioId = req.usuario._id
    
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precio,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: usuarioId
    });
   
    
    producto.save((err,productoDb) => {
        
        if(err){
            return errors.error500(err,res);
        };
        
        res.json({
            ok:true,
            producto:productoDb
        });
    });
});

app.put('/productos/:id',verificaToken,(req,res)=>{
    let id = req.params.id;
    let body = _.pick(req.body,['nombre','precioUni','descripcion','disponible','categoria','usuario']);
    Producto.findByIdAndUpdate(id,body,{new:true,runValidators:true},(err,categoriaDb) => {
        
        if(err){
            return errors.error500(err,res);
        };

        if(!productoDb){
            return errors.error400Product(err,res,'El producto no existe');
        };
        
        res.json({
            ok:true,
            categoria:categoriaDb
        });
    });
});






module.exports = app;