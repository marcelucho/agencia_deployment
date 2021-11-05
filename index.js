/*
Ambas formas se puede utilizar:
const express = require(`express`);   version common JS
import express from "express";        version de import se debe habilitar en el packege,json : "type": "module",
*/
import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";

const app = express();

// conectar la base de datos
db.authenticate()
    .then(()=> console.log(`BD conectado con éxito`))
    .catch(error =>console.log(error));



// definir puerto
const host = process.env.HOST || `0.0.0.0`;
const port = process.env.PORT || 4000;  // o si no existe utiliza el puerto 4000
// req - lo que enviamos
//res - lo que express nos responde

//Habilitar el pug
app.set(`view engine`, `pug`);

//obtener el año actual
app.use((req, res, next) =>{
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes"
    next();

})

//agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}))


// definir la carpeta publica
app.use(express.static(`public`));
app.use('/viajes', express.static('public'));
//Agregar router
app.use(`/`, router)


app.listen(port, host, () =>{
    console.log(`El servidor esta funcionando en el puerto ${port} y host ${host}`)

})
