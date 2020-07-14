
function error400(err,res){
    return res.status(400).json({
        ok:false,
        err
    });
};

function error500(err,res){
    return res.status(500).json({
        ok:false,
        err
    });
}

function error400Imagen(err,res,message){
    switch(message){
        case 'La extension no es valida, deben ser png, jpg, gif, jpeg':
            return res.status(400).json({
                ok : false,
                err:{
                    message
                }
            });
            
        case 'No se ha seleccionado ningun archivo':
            return res.status(400).json({
                ok : false,
                err:{
                    message
                }
            });
            
        case 'Los tipos permitidas son producto ,usuario' :
            return res.status(400).json({
                ok : false,
                err:{
                    message
                }
            });
            
        case 'Usuario not found':
            return res.status(400).json({
                ok : false,
                err:{
                    message
                }
            });
        case 'producto not found':
            return res.status(400).json({
                ok : false,
                err:{
                    message
                }
            });
        default:
            return res.status(400).json({
                ok : false,
                err
            });
    };
};

function error401(err,res,message){
    switch(message){
        case 'Token no valido':
            return res.status(401).json({
                ok : false,
                err:{
                    message
                }
            });
            
        case 'El usuario no es un administrador':
            return res.status(401).json({
                ok : false,
                err:{
                    message
                }
            });
            
        default:
            return res.status(401).json({
                ok : false,
                err
            });
    }
};

function error400Product(err,res,message){
    switch(message){
        case 'El producto no existe':
            return res.status(400).json({
                ok : false,
                err:{
                    message
                }
            });
        
        default:
            return res.status(400).json({
                ok : false,
                err
            });
    };
};

function error400Login(err,res,message){
    switch(message){
        case 'Usuario o contraseña incorrecto':
            return res.status(400).json({
                ok : false,
                err:{
                    message
                }
            });
        
        default:
            return res.status(400).json({
                ok : false,
                err
            });
    };
};




module.exports = {
    error400,
    error401,
    error400Imagen,
    error500,
    error400Product,
    error400Login
}