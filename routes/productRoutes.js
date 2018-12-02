// routa para /api/product
"use strict"

var productController = require('../controllers/productController.js');

module.exports = class Routes {  
    static register(server) {

        const controller = new productController();

        server.get('/_api/config/:id', (req,res,next) =>
        {
            controller.getConfig(req,res);
            next();
        });

        server.get('/_api/usr/:id', (req,res,next) =>
        {
            controller.getUsr(req,res);
            console.log('peticion get');
            next();
        });

        server.get('/api/md5/:cadena', (req,res,next) =>
        {
            controller.getMD5(req,res);
            console.log('peticion get MD5');
            next();
        });
     
     
     /*   server.post('/api/products/:id', (req,res,next) =>
        {
            controller.post(req,res);
            console.log('peticion post');
            next();
        });
    */
    }
}