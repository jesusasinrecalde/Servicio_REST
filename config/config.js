'use strict'

const corsMiddleware = require('restify-cors-middleware');

// config.js
module.exports = {
  TOKEN_SECRET: process.env.TOKEN_SECRET || "tokenultrasecreto",
  LISENT_PORT : process.env.PORT ||8080,
  db:{
    uri: "mongodb://usuario_lect:pwd555798@ds261128.mlab.com:61128/hejmo" }
};

