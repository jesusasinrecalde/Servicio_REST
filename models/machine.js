'use strict';


var mongoose = require ('mongoose');
var Conf = require ('../models/configuracionModel.js');


var Schema = mongoose.Schema;

/** 
 * User Schema 
 *   */

 var UserSchema = new Schema({
    machine:{
        type: String,
        trim: true,
        required: true
    },
    Name:{
        type: String,
        trim: true,
        required: true
    },
  
    password: {
        type: String ,
        required: true
    },
 
    configuration_id:{
        type: Schema.Types.ObjectId, ref: 'configuracions'
    }
 });


 


 module.exports= mongoose.model('machine',UserSchema);