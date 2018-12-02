'use strict';


var mongoose = require ('mongoose');
var Conf = require ('../models/install_elementosModel.js');


var Schema = mongoose.Schema;

/** 
 * User Schema 
 *   */

 var InstallSchema = new Schema({
    user:{
        type: String,
        trim: true,
        required: true
    },
    instalacion:{
        type: String,
        trim: true,
        required: true
    },
    elem_id:{
        type: Schema.Types.ObjectId, ref: 'install_elementos'
    }

   
 });


 module.exports= mongoose.model('instalations',InstallSchema);