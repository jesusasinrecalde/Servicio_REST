// se encarga de la peticion de la ruta /api/products
'use strict'


var ObjetoUsuarios = require('../controllers/usuarios.js');

module.exports = class productController {

   
    constructor() {
        this.products = new Array();
        
    }

    get(req, res)  {
        
        
        //console.log(req);
       //console.log(req.headers.cabecer);

       if(req.params.id!=null && req.headers.pwd != null)
        {
            res.json({
               
                //usr : req.headers.id,
                md5 : req.headers.pwd
            })
    
        }
        else
            res.send(401,"datos no validos");
    
    }

    getUsr(req,res)
    {
        const  Usuarios = new ObjetoUsuarios();
       
        if(req.params.id!=null && req.headers.pwd != null)
        {
            if(Usuarios.PreguntarPorUsario(req.params.id,req.headers.pwd))
            {
                res.json({
                   authorization:Usuarios.createToken(req.params.id),
                   data:Usuarios.getData(req.params.id)
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
        //res.send(200,this.products);
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