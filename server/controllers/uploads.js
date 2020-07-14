const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const usuario = require ('../models/usuario');
const Producto= require('../models/producto');
const fs = require('fs');
const path = require ('path');
const errors = require ('../error/error');

app.use(fileUpload());

app.put('/upload/:tipo/:id', (req, res) => {

    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files || Object.keys(req.files).length === 0) {
        return errors.error400Imagen(err,res,'no se ha seleccionado ningun archivo');
      };

      //validar tipo
    let tipoValidos = ['producto','usuario'];
    if(tipoValidos.indexOf(tipo) < 0 ) {
        return errors.error400Imagen(err,res,`Los tipos permitidas son ${tipoValidos.join(', ')}`);  
    };


    let archivo = req.files.archivo;
    let nombreArchivoSplit = archivo.name.split('.');
    let extension = nombreArchivoSplit[nombreArchivoSplit.length -1 ];
    // Extensiones permitidas
    let extensionesValidas= ['png','jpg','gif','jpeg'];
      
    // Valido extensiones 
    if (extensionesValidas.indexOf(extension) < 0){
        return errors.error400Imagen(err,res,`La extension no es valida, deben ser ${extensionesValidas.join(', ')}`);
    };

    // cambiar nombre del archivo
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`
    // Use the mv() method to place the file somewhere on your server
    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
        if (err){
            return errors.error500(err,res);
        };
        // Aqui, imagen subida correctamente
        if (tipo === 'usuario')
            imagenUsuario(id,res,nombreArchivo);
        else
            imagenProducto(id,res,nombreArchivo)
  });
});

function imagenUsuario(id,res,nombreArchivo){
    usuario.findById(id,(err,usuarioDB)=>{
        
        if (err){
            borrarArchivo(nombreArchivo,'usuario');
            return errors.error500(err,res);
        };

        if(!usuarioDB){
            borrarArchivo(nombreArchivo,'usuario');
            return errors.error400Imagen(err,res,'Usuario not found');
        };
        
        
        borrarArchivo(usuarioDB.img,'usuario')
        
        usuarioDB.img = nombreArchivo;

        usuarioDB.save((err,usuarioGuardado) => {
            
            if (err) {
                return errors.error500(err,res);
            };
            
            res.json({
                ok:true,
                usuario:usuarioGuardado,
                img: nombreArchivo
            });
        });

    });
};

function imagenProducto(id,res,nombreArchivo){
    Producto.findById(id,(err,productoDB)=>{
        if (err){
            borrarArchivo(nombreArchivo,'producto');
            return errors.error500(err,res);
        };

        if(!productoDB){
            borrarArchivo(nombreArchivo,'producto');
            return errors.error400Imagen(err,res,'producto not found');
        };
        
        
        borrarArchivo(productoDB.img,'producto')
        productoDB.img = nombreArchivo;
        productoDB.save((err,productoGuardado) => {
            if (err) {
                return error500(err,res);
            };

            res.json({
                ok:true,
                producto:productoGuardado,
                img: nombreArchivo
            });
        });

    });
};



function borrarArchivo(nombreImagen,tipo){
    // si existe la imagen que se guarda en la bd la borra del file
    let pathImagen = path.resolve(__dirname,`../../uploads/${tipo}/${nombreImagen}`);
        
    if(fs.existsSync(pathImagen)){
        fs.unlinkSync(pathImagen);
    };
};


module.exports = app; 