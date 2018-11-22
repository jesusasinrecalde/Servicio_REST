'use strict';
var User = require ('../models/userModel.js');
var Conf = require ('../models/configuracionModel.js');
var ConfMachine = require ('../models/conf_machine.js');
var ctoken = require('../controllers/token.js');

module.exports = class UserController {

    EncuentraUsario(req,res,next)
    {
        var token = new ctoken();
        console.log("Buscando ["+req.params.usr+"] pwd["+req.headers.pwd+"]");
        User.find({User:req.params.usr,password:req.headers.pwd}, (err,people)=> {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            if (err) 
            { 
                console.log("fallo en la busqueda del usuario");
                  return   res.send(401,"datos no validos"); 
            }
            if(people.length==0)
            {
                console.log("usuario no encontrado");
                 return  res.send(401,"datos no validos");  // si no hay usuario mandamos un error
            }
            return res.json({authorization:token.createToken(req.params.usr) });
     
        });
    }

    getConfiguracion(req,res,next,usuario)
    {
 
        User.find({User:usuario}, (err,usu)=>
        {
           
                Conf.populate(usu,{path:"configuration_id"},function(err, usu){
                    if(usu.length==0) return  res.send(401,"datos no validos");  // si no hay usuario mandamos un error
                    if(usu[0].type == "human")
                    {
                        return res.json({
                            
                                device : usu[0].configuration_id.device,
                                apikey : usu[0].configuration_id.apikey,
                                type : usu[0].configuration_id.type,
                                mode : usu[0].configuration_id.mode
                            
                     });
                    }
                    if(usu[0].type == "machine")
                    {
                        return res.json({
                            
                                    VERSIONSW :         usu[0].configuration_id.version_sw,
                                    CARRIOTS_DEVICE :   usu[0].configuration_id.device,
                                    CARRIOTS_DEVICEIN : usu[0].configuration_id.device_in,
                                    CARRIOTS_API_KEY :  usu[0].configuration_id.apikey,
                                    HEJMO_WRITE :       usu[0].configuration_id.hejmo_write,
                                    HEJMO_CALL_MOVIL :  usu[0].configuration_id.hejmo_call_movil,
                                    HEJMO_CALL_GPS :    usu[0].configuration_id.hejmo_call_gps,
                                    type :              usu[0].configuration_id.type
                            
                         });

                    }
                });
           
            
        }); 
           
    }

    getConf(value)
    {
        /* '5bce3264fb6fc060274b2d9a' */
        var configuracion;

        Conf.findById(value).exec(function (err, post) {
            //console.log("exec"+post);
            configuracion=post[0];
                });
        return configuracion;
    }
  
}