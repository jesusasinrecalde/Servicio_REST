'use strict';
var Machine = require ('../models/machine.js');
var Conf = require ('../models/configuracionModel.js');
var ctoken = require('../controllers/token.js');

module.exports = class MachineController {

    EncuentraMachine(req,res,next)
    {
        var token = new ctoken();
        console.log("Buscando ["+req.params.mach+"] pwd["+req.headers.pwd+"]");
        Machine.find({machine:req.params.mach,password:req.headers.pwd}, (err,people)=> {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            if (err) 
            { 
                console.log("fallo en la busqueda de la maquina");
                  return   res.send(401,"datos no validos"); 
            }
            if(people.length==0)
            {
                console.log("machines no encontrado");
                 return  res.send(401,"datos no validos");  // si no hay usuario mandamos un error
            }
            return res.json({authorization:token.createToken(req.params.mach) });
     
        });
    }
    getConfiguracion(req,res,next,mach)
    {
 
        Machine.find({machine:mach}, (err,usu)=>
        {
           
                Conf.populate(usu,{path:"configuration_id"},function(err, usu){
                    if(usu.length==0) return  res.send(401,"datos no validos");  // si no hay usuario mandamos un error
                    
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

                    
                });
           
            
        }); 
           
    }

}