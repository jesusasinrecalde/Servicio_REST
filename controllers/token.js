'use strict';
var md5 = require('js-md5');
var jwt = require('jwt-simple');
var moment = require('moment');

var config = require('../config/config.js');

var User = require ('../models/userModel.js');
module.exports = class ctoken
{
    createToken (usu) {
        console.log("token : "+ usu);
        var payload = {
          sub: usu,
          iat: moment().unix(),
          exp: moment().add(14, "days").unix(),
        };

      
        return jwt.encode(payload, config.TOKEN_SECRET);
      }

  
    validaToken(cadenaToken)  {
        var retorno=0;
        console.log("valida token ");
        console.log("valida token "+cadenaToken+"<<<<");
        var payload = jwt.decode(cadenaToken, config.TOKEN_SECRET);
        console.log(" decode :" +payload);
        // el token tiene que estar en el tiempo valido  
        if(payload.exp!=null && payload.sub!=null)
        {
         if(payload.exp <= moment().unix()) 
         {
            console.log("token expirado");
            retorno = 1 ; //token expirado
          }
         
          console.log(" buscando :" +payload.sub);
          User.find({User:payload.sub}, (err,people)=> {
           
            if (err) return   -1 ;
            if(people.length==0) return 2 ;  // si no hay usuario mandamos un error
            console.log(" Encontrado :" +payload.sub);
            return 0;
     
        });
      }  
      return retorno;
    }

    validaTokenAdm(cadenaToken)  {
      var retorno=0;
      if(cadenaToken==null)
        return -2;
      console.log("valida token ");
      console.log("valida token "+cadenaToken+"<<<<");
      var payload = jwt.decode(cadenaToken, config.TOKEN_SECRET);
      console.log(" decode :" +payload);
      // el token tiene que estar en el tiempo valido  
      if(payload.exp!=null && payload.sub!=null)
      {
       if(payload.exp <= moment().unix()) 
       {
          console.log("token expirado");
          retorno = 1 ; //token expirado
        }
       
        console.log(" buscando :" +payload.sub);
        User.find({User:payload.sub,administrador:'1'}, (err,people)=> {
         
          if (err) return   -1 ;
          if(people.length==0) 
          {
            console.log("NO  Encontrado :" +payload.sub);
            return 2 ;  // si no hay usuario mandamos un error
          }
          console.log(" Encontrado :" +people[0].Name+" adm :"+people[0].administrador);
          return 0;
   
      });
    }  
    return 0;
  }

  getUser(cadenaToken)
  {
    var usuario="";
    if(cadenaToken==null)
      return null;
    var payload = jwt.decode(cadenaToken, config.TOKEN_SECRET);
    return payload.sub;
  }
}