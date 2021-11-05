import { Viaje } from "../models/Viaje.js"
import { Testimonial } from "../models/testimoniales.js";

const paginaInicio = async (req, res)=>{
        // Consultar 3 viajes del modelo viaje

        /* Se hace con promise por que se van a consultar 2 veces a la BD y de esta manera se ejecutaran los 2 la mismo tiempo */
        const promiseDB = [];
        promiseDB.push(Viaje.findAll({limit:3}));
        promiseDB.push(Testimonial.findAll({limit:3} ));

        try {
            const resultado = await Promise.all(promiseDB);

            res.render( `inicio`, {
                pagina: "Inicio",
                clase: `home`,
                viajes: resultado[0],
                testimoniales: resultado[1]
            }); // busca el archivo inicio.pug
            
        } catch (error) {
            console.log(error);
        }

    
}

const paginaNosotros = (req, res)=>{
    res.render(`nosotros`,{
        pagina: "Nosotros"
    });  // busca el archivo nosotros.pug
}

const paginaViajes = async (req, res)=>{

    // Consultar BD
    const viajes = await Viaje.findAll();
    //console.log(viajes);

    res.render(`viajes`,{
        pagina: "Próximos Viajes",
        viajes,
    }); // busca el archivo viajes.pug
}

const paginaTestimoniales = async (req, res)=>{

    try {
        const testimoniales = await Testimonial.findAll();
        res.render(`testimoniales`,{
            pagina: "Testimoniales",
            testimoniales  // busca el archivo Testimoniales.pug
        }); 
    } catch (error) {
        console.log(error)
    }


   
   
}

//muestra una pagina por su slug

const paginaDetalleViaje = async (req, res) => {
    const {slugViaje} = req.params;

    try {
        const viaje = await Viaje.findOne({where : {slug: slugViaje }});
        res.render(`viaje`,{
            pagina: "información Viaje",
            viaje
        })
    } catch (error) {
        console.log(error)
    }

}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}