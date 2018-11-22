'use strict';


var mongoose = require ('mongoose');
var Conf = require ('../models/configuracionModel.js');


var Schema = mongoose.Schema;

/** 
 * User Schema 
 *   */

 var UserSchema = new Schema({
    User:{
        type: String,
        trim: true,
        required: true
    },
    Name:{
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String ,
        required: true
    },
    administrador: {
        type: String,
        required:true
    },
    type: {
        type: String,
        required:true
    },
    created: {
        type: Date,
        default: Date.now
    },
    configuration_id:{
        type: Schema.Types.ObjectId, ref: 'configuracions'
    }
 });


 UserSchema.methods.comparePassword = function(password){
     var retorno=false;
     if(password == this.password)
        retorno=true;
    return retorno;
 };
 


 module.exports= mongoose.model('user',UserSchema);

 