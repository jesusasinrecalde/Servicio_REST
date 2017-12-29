
"use strict"


var md5 = require('js-md5');
var jwt = require('jwt-simple');
var moment = require('moment');

var config = require('../config/config.js');

module.exports = class cUsuarios {
    
       // this.ListaUsuarios; 
      
        constructor() {
            this.products = new Array();
            this.ListUsuarios = new Array();
            var usu = {
                Usuario:   "jesus.asin",
                pwd: md5("jesus1"),
                type : "human",
                data: { 
                    name : "Jesus Asin",
                    device: "demo@jesusasinrecalde.jesusasinrecalde",
                    apikey: "ee919e312f4a7310093bb7519293dede9cf4db4262accdb9284d91f234ae7713",
                    type:"device",
                    mode:"full"

                }
              };
            this.ListUsuarios.push(usu);
            
            usu = {
                Usuario:   "alberto.asin",
                pwd: md5("alberto1"),
                type : "human",
                data: { 
                    name : "Alberto Asin",
                    device: "demo@jesusasinrecalde.jesusasinrecalde",
                    apikey: "ee919e312f4a7310093bb7519293dede9cf4db4262accdb9284d91f234ae7713",
                    type:"device",
                    mode:"full"
                }
              };
            this.ListUsuarios.push(usu);
            
            usu = {
                Usuario:   "sonia.garrido",
                pwd: md5("sonia1"),
                type : "human",
                data: { 
                    name : "Sonia Garrido",
                    device: "demo@jesusasinrecalde.jesusasinrecalde",
                    apikey: "ee919e312f4a7310093bb7519293dede9cf4db4262accdb9284d91f234ae7713",
                    type:"device",
                    mode:"full"
                }

              };
            this.ListUsuarios.push(usu);
            
            usu = {
                Usuario:   "carlos.penna",
                pwd: md5("carlos1"),
                type : "human",
                data: { 
                    name : "Juan Carlos Peña",
                    device: "demo@jesusasinrecalde.jesusasinrecalde",
                    apikey: "ee919e312f4a7310093bb7519293dede9cf4db4262accdb9284d91f234ae7713",
                    type:"device",
                    mode:"read"
                }
              };
            this.ListUsuarios.push(usu);
            
            usu = {
                Usuario:   "0000000047f5ccd0",
                pwd: md5("0000000047f5ccd01"),
                type : "machine",
                data: { 
                    VERSIONSW : "1.0", 
                    PRB : "kk",
                    CARRIOTS_DEVICE: "prueba1@jesusasinrecalde.jesusasinrecalde",
                    CARRIOTS_DEVICEIN: "Indemo@jesusasinrecalde.jesusasinrecalde",
                    CARRIOTS_API_KEY: "ee919e312f4a7310093bb7519293dede9cf4db4262accdb9284d91f234ae7713",
                    HEJMO_WRITE :"1",
                    HEJMO_CALL_MOVIL : "0",
                    HEJMO_CALL_GPS : "0"  ,
                    type:"machine"
                }
              };
            this.ListUsuarios.push(usu);
 
            usu={
                Usuario :   "feo",
                pwd : "pwd",
                type : "unknow",
                data: { 
                    device: "device",
                    apikey: "key"
                }
            };
            this.ListUsuarios.push(usu);

        }

        CalculaMD5 (Cadena) {
            console.log("Calculo md5 "+Cadena);
            return md5(Cadena);
        } 

        getUsuario(usuId)
        {
            var retorno;
            var indice=0;
            console.log("getUsuario "+usuId);
            for(indice=0;indice<this.ListUsuarios.length  ;indice++)
                {
                    if(usuId == this.ListUsuarios[indice].Usuario )
                    {
                       //console.log("getUsuario "+this.ListaUsuarios[indice]);
                       retorno= this.ListUsuarios[indice];
                       break;
                    }
                }
            return retorno;    

        }

        PreguntarPorUsario(usu,pwd)
        {
            
            var retorno=0;
            var indice=0;
            console.log("Usu "+usu);
            console.log(this.ListUsuarios);
            
            for(indice=0;indice<this.ListUsuarios.length  ;indice++)
            {
                console.log (usu +">" + this.ListUsuarios[indice].Usuario);
                console.log (pwd +">>" + this.ListUsuarios[indice].pwd );
                if(usu == this.ListUsuarios[indice].Usuario && pwd == this.ListUsuarios[indice].pwd )
                {
                   retorno=1;
                   console.log("Usuario "+usu+" Encontrado ");
                   break;
                }
            }
            if(retorno==0)
                console.log("Usuario no encontrado");
            return retorno;
        }

        createToken (usu) {
            var payload = {
              sub: usu,
              iat: moment().unix(),
              exp: moment().add(14, "days").unix(),
            };

          
            return jwt.encode(payload, config.TOKEN_SECRET);
          }
        
        
        getData(usuId)
        {
            console.log("getData "+usuId);
            return this.getUsuario(usuId).data;

        }  

        validaToken(pepe)
        {
           var retorno=0;
           console.log("valida token ");
           console.log("valida token "+pepe+"<<<<");
           var payload = jwt.decode(pepe, config.TOKEN_SECRET);
           console.log(" decode :" +payload);
           // el token tiene que estar en el tiempo valido  
           if(payload.exp!=null && payload.sub!=null)
            {
                if(payload.exp <= moment().unix()) 
                {
                    console.log("token expirado");
                    retorno = 1 ; //token expirado
                }
                else if( this.getUsuario(payload.sub)== null)
                {
                    console.log("usuario no vallido en token");
                    retorno = 2; // el usuario que contiene el token no es valido 
                }
                
            }
            else
                retorno = -1; // contenido del token no valido 
            
            return retorno;
        }
        
    }