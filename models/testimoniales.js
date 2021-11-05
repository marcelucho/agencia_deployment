import { Sequelize } from "sequelize";
import db from "../config/db.js";

//db.define(`nombre de la tabla`, {todos los campos como objeto});
export const Testimonial = db.define(`testimoniales`,
{// id no hace falta por que el ORM da por hecho de que hay un ID
    nombre:         {type:Sequelize.STRING},
    correo:         {type:Sequelize.STRING},
    mensaje:        {type:Sequelize.STRING}
   
});
