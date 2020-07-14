const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const app = express();
const Usuario = require('../models/usuario');
const errors = require ('../error/error');

app.post('/login',(req,res)=>{
   let body = req.body;
   Usuario.findOne({email: body.email},(err, usuarioDB) => {
        if(err){
            return errors.error400(err,res);   
        };

        if (!usuarioDB){
            return errors.error400Login(err,res,'Usuario o contraseña incorrecto')   
        };
       
       if (!bcrypt.compareSync(body.password, usuarioDB.password)){
            return errors.error400Login(err,res,'Usuario o contraseña incorrecto')   
        };
       // Arma el token para devolverselo al usuario.
       let token = jwt.sign({
           usuario:usuarioDB
       },process.env.SEED, { expiresIn:60*60 });
       
       res.json({
           ok:true,
           usuario:usuarioDB,
           token: token
       })
   })
});

//CONFIGURACIONES DE GOOGLE

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    console.log(payload);
    return {
        nombre:payload.name,
        emamil: payload.email,
        img:payload.picture,
        google:true
    }
  }

app.post('/google',async (req,res)=>{
    let token = req.body.idtoken;
    let googleUser = await verify(token)
    .catch(e=>{
        res.status(403).json({
            ok:false,
            err:e
        })
    });

    Usuario.findOne({email:googleUser.emamil},(err,usuarioDB) =>{
        if(err){
            return errors.error500(err,res)
        };

        if (usuarioDB){
            
            if(usuarioDB.google === false){
                return errors.error500(err,res);
            } else {
                
                let token = jwt.sign({
                    usuario:usuarioDB
                },process.env.SEED, { expiresIn:60*60 });
                
                return res.json({
                    ok:true,
                    usuario:usuarioDB,
                    token
                })
            }
        } else {
            let usuario = new Usuario();
            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.emamil;
            usuario.img = googleUser.img;
            usuario.password = ':)';
            usuario.save((err,usuarioDB)=>{
                if(err){
                    return errors.error500(err,res);
                };
            
                let token = jwt.sign({
                    usuario:usuarioDB
                },process.env.SEED, { expiresIn:60*60 });

                res.json({
                    ok:true,
                    usuario:usuarioDB,
                    token
                })
            })
        };
    
    });
});

module.exports = app