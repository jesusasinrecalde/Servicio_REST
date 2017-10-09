// se encarga de la peticion de la ruta /api/products
'use strict'


var ObjetoUsuarios = require('../controllers/usuarios.js');

module.exports = class productController {

   
    constructor() {
        this.products = new Array();
        
    }

    get(req, res)  {
        
        // -----------------------------

        if (req.method.toLowerCase() === 'options')
        {
           console.log('received an options method request');
           var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'Origin', 'X-Requested-With']; // added Origin & X-Requested-With
     
           if (res.methods.indexOf('OPTIONS') === -1)
                res.methods.push('OPTIONS');
     
           res.header('Access-Control-Allow-Credentials', true);
           res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
           res.header('Access-Control-Allow-Methods', res.methods.join(', '));
           res.header('Access-Control-Allow-Origin', "*" );
        }
       
       //------------------------------
        //console.log(req);
       //console.log(req.headers.cabecer);
       res.header('Access-Control-Allow-Headers', 'Accept, Content-Type, X-Requested-With');
       if(req.params.id!=null && req.headers.pwd != null)
        {
            res.json({
               
                //usr : req.headers.id,
                md5 : req.headers.pwd
            })
    
        }
        else
        {
           res.send(401,"datos no validos");
        }
    }

    getUsr(req,res)
    {
        const  Usuarios = new ObjetoUsuarios();
       
        // -----------------------------

        if (req.method.toLowerCase() === 'options')
         {
            console.log('received an options method request');
            var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'Origin', 'X-Requested-With']; // added Origin & X-Requested-With
      
            if (res.methods.indexOf('OPTIONS') === -1)
                 res.methods.push('OPTIONS');
      
            res.header('Access-Control-Allow-Credentials', true);
            res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
            res.header('Access-Control-Allow-Methods', res.methods.join(', '));
            res.header('Access-Control-Allow-Origin', "*");
         }
        
        //------------------------------



        if(req.params.id!=null && req.headers.pwd != null)
        {
            if(Usuarios.PreguntarPorUsario(req.params.id,req.headers.pwd))
            {
                
                res.json({
                   authorization:Usuarios.createToken(req.params.id)
                  
                })
            }
            else
                res.send(401,"datos no validos");    
        }
         else
            res.send(401,"datos no validos");   
    }

    getMD5(req, res) {
        
        const Usuarios = new ObjetoUsuarios();
       // console.log(req);
       console.log(req.headers.cabecer);
       
        res.json({
              md5 : Usuarios.CalculaMD5(req.params.cadena)
        })

    }

    getConfig(req, res)
    {
        const  Usuarios = new ObjetoUsuarios();
        
        console.log("getConfig");
        // tiene que tener en la cabecera el token
        
        if(!req.headers.authorization) {
            return res.send(403,"no token found");
          }
        if(req.params.id!=null   )
        {
            
            console.log("token :"+req.headers.authorization);
            this.cadena=req.headers.authorization;
            if( Usuarios.validaToken(this.cadena) == 0 )
            {
                res.json({
                   data:Usuarios.getData(req.params.id)
                 })
            }
            else
                return res.send(403,"no token valid");
        }
        else
            res.send(401,"datos no validos");
        
       
    }

    post(req, res) {

        var product = {
            sku:   req.body.sku,
            asin:  req.body.asin,
            upc:   req.body.upc,
            title: req.body.title,
            image: req.body.image,
            pet:   req.params.id
        };


        this.products.push(product);
       
        res.send(201,res.header('Location', '/api/products/' + product.sku));
    };
}