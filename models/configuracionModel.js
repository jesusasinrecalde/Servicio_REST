'use strict';

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;


 var ConfiguracionSchema = new Schema({
    User:{
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
    version_sw :  {
        type: String ,
        required: true
    }
    
 });

 ConfiguracionSchema.methods.GetDataId = function(id){
    ConfiguracionSchema.findById(id)
   .exec((err, post) => {
       if(err)
        return null;
        console.log("exec"+post);
        return post;
         }
        );
    };


// module.exports= mongoose.model('User',UsuarioConfSchema);
 module.exports= mongoose.model('configuracion',ConfiguracionSchema);

 