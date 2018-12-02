'use strict';


var mongoose = require ('mongoose');

var Schema = mongoose.Schema;



 var Install_elemSchema = new Schema({
    nombre:{
        type: String,
        trim: true,
        required: true
    },
    elem :[
        {
            tipo:{
                type: String,
                trim: true,
                required: true
            },
            id_hejmo:{
                type: String,
                trim: true,
                required: true
            },
            idmodbus:{
                type: String,
                trim: true,
                required: true
            },
            name:{
                type: String,
                trim: true,
                required: true
            },

        }
    ]
    
 });


 module.exports= mongoose.model('install_elementos',Install_elemSchema);