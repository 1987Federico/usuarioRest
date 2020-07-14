const express = require('express');
const _ = require ('underscore');
const bcrypt = require('bcrypt');
const app = express();
const Usuario = require('../models/usuario');
const { verificaToken, verificaRole } = require('../middlewares/autenticacion');
const errors = require ('../error/error');

app.get('/usuario',verificaToken,(req,res) => {
    let desde = Number (req.query.desde) || 0;
    let limite = Number (req.query.limite) || 5;
    
    Usuario.find({estado:true})
        .skip(desde)
        .limit(limite)
        .exec((err,usuarioDB)=>{
            if (err){
                return errors.error400(err,res)
            } else {
                
                Usuario.count((err,conteo)=>{
                    res.json({
                        ok:true,
                        usuario:usuarioDB,
                        cantidad: conteo
                    });
                })
            }
    });
});

app.post('/usuario',[verificaToken,verificaRole],(req,res) => {
    let body = req.body;
    let usuario = new Usuario({
        nombre:body.nombre,
        email:body.email,
        password:bcrypt.hashSync(body.password,10),
        rol:body.rol
    });

    // save es propio de mongoose para poder grabar el schema en la BD
    usuario.save((err,usuarioDB)=>{
        if(err){
            return errors.error400(err,res)
        } else {
            res.json({
                ok:true,
                usuario:usuarioDB
            });
        };
    });  
});

app.put('/usuario/:id',[verificaToken,verificaRole],(req,res) =>{
    // recupera parametro 
    let id = req.params.id
    let body = _.pick(req.body,['nombre','email','img','rol','estado']);

    // metodo propio de mongosse sin el new manda el objeto viejo 
    // con el new manda el objeto modificado
    Usuario.findByIdAndUpdate(id,body,{new:true,runValidators:true},(err,usuarioDB) =>{
        if (err){
            return errors.error400(err,res)
        };
        
        res.json({
            ok:true,
            usuario: usuarioDB
        });
    });
});

app.delete('/:id',[verificaToken,verificaRole],(req,res) =>{
    let id = req.params.id;

    Usuario.findByIdAndDelete(id,(err,res) => {
        if(err){
            return errors.error400(err,res)
        };
        
        res.json({
            ok:true
        });
    });
});

module.exports = app;