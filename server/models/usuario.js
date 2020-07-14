const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
 


let rolesValidos = {
    values: ['ADMIN_ROL','USER_ROL'],
    message: '{VALUE} no es un rol valido'
};

let Schema = mongoose.Schema;


let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email:{
        type: String,
        unique:true,
        required: [true, 'El email es necesario']
    },
    password:{
        type: String,
        required: [true, 'El password es requerido']
    },
    img:{
        type:String,
        required: false
    },
    rol:{
        type: String,
        default: 'USER_ROL',
        enum: rolesValidos
    },
    estado:{
        type: Boolean,
        default:true
    },
    google:{
        type: Boolean,
        dedfault:false
    }
});

usuarioSchema.methods.toJSON= function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator,{message: '{PATH} El email debe de ser unico'})
module.exports = mongoose.model('Usuario', usuarioSchema);