'use strict';


var mongoose = require ('mongoose');

var Schema = mongoose.Schema;



 var Install_elemSchema = new Schema({
    nombre:{
        type: String,
        trim: true,
        required: true
    },
    device:{
        type: String,
        required: true
    },
    apikey:{
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    mode: {
        type: String ,
        required: true
    },
    valor: {
        type: String ,
        required: true
    },
    device_in: {
        type: String ,
        required: true
    },
    hejmo_write: {
        type: String ,
        required: true
    },
    hejmo_call_movil: {
        type: String ,
        required: true
    },
    hejmo_call_gps: {
        type: String ,
        required: true
    },
    hejmo_correo: {
        type: String ,
        required: true
    },
    hejmo_hide_correo: {
        type: String ,
        required: true
    },
    version_sw :  {
        type: String ,
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
            modo:{
                type: String,
                trim: true,
                required: true
            }

        }
    ]
    
 });


 module.exports= mongoose.model('install_elementos',Install_elemSchema);