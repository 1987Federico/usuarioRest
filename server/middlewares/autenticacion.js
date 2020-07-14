const jwt = require('jsonwebtoken')
const errors = require ('../error/error');

//Verifica Token
let verificaToken = (req,res,next) => {
    
    let token = req.get('Authorization');
    jwt.verify(token,process.env.SEED,(err,decode)=>{
        if(err) {
            return errors.error401(err,res)
        }
        req.usuario = decode.usuario;
        next();
    });
};

let verificaRole = (req,res,next) => {
    let usuario = req.usuario.rol;

    if(usuario != 'ADMIN_ROL'){
        return errors.error401(err,res,'El usuario no es un administrador');    
    };
    next();
};

let verificaTokenImg = (req,res,next) => {
    let token = req.query.token;
    jwt.verify(token,process.env.SEED,(err,decode)=>{
        if(err) {
            return errors.error401(err,res,'Token no valido');        
        }
        req.usuario = decode.usuario;
        next();
    });
};



module.exports = {
    verificaToken,
    verificaRole,
    verificaTokenImg
}