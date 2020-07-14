const mongoose = require ('mongoose');
const Schema = mongoose.schema; 


let categoriaSchema = new mongoose.Schema({
    nombre: { type: String, 
                   unique:true,
                   required:[true,'La descripcion es requerida']
                },
    usuario: {type: mongoose.SchemaTypes.ObjectId, ref:'Usuario'}
});

module.exports = mongoose.model('Categoria', categoriaSchema);