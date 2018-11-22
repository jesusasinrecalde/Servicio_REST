'use strict';

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;


 var ConfMachineSchema = new Schema({
    name:{
        type: String,
        required: true
    }, 
    VERSIONSW:{
        type: String,
        required: true
    },
    CARRIOTS_DEVICE:{
        type: String,
        required: true
    },
    CARRIOTS_DEVICEIN:{
        type: String,
        required: true
    },
    CARRIOTS_API_KEY: {
        type: String,
        required: true
    },
    HEJMO_WRITE: {
        type: String ,
        required: true
    },
    HEJMO_CALL_MOVIL: {
        type: String ,
        required: true
    },

    HEJMO_CALL_GPS: {
        type: String ,
        required: true
    },
    type: {
        type: String ,
        required: true
    },


 });


 module.exports= mongoose.model('confMachine',ConfMachineSchema);

 