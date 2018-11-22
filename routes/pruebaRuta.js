// routa para /api/product
"use strict"

var UserController = require('../controllers/UserControler.js');
var ctoken = require('../controllers/token.js');



module.exports = class Routes {  
    static register(server) {

        var Usrcontroller = new UserController();
        var token = new ctoken();

        // retorna un token para un usuario que este registrado 
        server.get('/api/usr/:usr', (req,res,next) =>
        {
            console.log('peticion generacion token');
            return Usrcontroller.EncuentraUsario(req,res,next);
            next();
        });

        // Validacion de token ----------------------
        server.get('/api/config/:id', (req,res,next) =>
        {
            var usuario;
            console.log('valida');
            if(token.validaToken(req.headers.token)!=0)
            {
                return res.send(401,"datos no validos");
            }

            return res.send(200,"");
            

            next();
        });
        
        // nuevo usuario 
//        server.get('/api/add', (req,res,next) =>
//        {
//            //var respuesta = token.validaTokenAdm(req.headers.token) // solo es ejecutable por administradores 
//            //if(respuesta!=0)
//            //{
//            //    return res.send(403,"no autorizado");
//            //}
//            if(token.validaToken(req.headers.token)!=0)
//            {
//                return res.send(401,"datos no validos");
//            }
//           return  Usrcontroller.getConfiguracion(req,res,next,token.getUser(req.headers.token));
//         
//            next();
//        });



    }
}