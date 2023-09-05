import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TarjetaServicios from './TarjetaServicios'

//Quiero que mi galeria de Servicios muestre todos los servicios que tengo en mi base de datos estoy usando Mysql
//Para eso voy a usar un hook de react que se llama useEffect
//useEffect me permite ejecutar codigo de manera condicional
//useEffect recibe dos parametros, el primero es una funcion anonima y el segundo es un arreglo de dependencias
//Si el arreglo de dependencias esta vacio, la funcion anonima se ejecuta una sola vez cuando el componente se renderiza por primera vez
//Si el arreglo de dependencias tiene elementos, la funcion anonima se ejecuta cada vez que alguno de los elementos del arreglo de dependencias cambia
//Si el arreglo de dependencias no existe, la funcion anonima se ejecuta cada vez que el componente se renderiza


const GaleriaServiciosOpen = () => {
      //UseEffect Servicios, verificando si hay servicios o no ademas de que se actualice cada vez que se agregue un servicio y estos servicios llenen los campos de mi tarjeta
     //Quiero que los servicios obtenidos de mi base de datos se muestren en mi galeria de servicios con los datos que obtengo de ellos con un array
    //Usando Axios y Metodo Pos
    //Quiero una muestra de 3 ejemplos en el array para introducir en mis tarjetas de servicios
    const [servicioss, setServicios] = useState([]);
    useEffect(() => {
      //Obtengo los servicios desde mi backend y los almaceno en mi estado de servicios
   const obtenerServicios = async () => {
       const { data } = await axios.get('http://localhost:8000/api/servicios');
       setServicios(data);
   }
   //Aca quiero exportar las categorias, nombre y descripcion en forma de un array para mis tarjetas
    obtenerServicios();
    }, [])

    //Crea un objeto de servicios de prueba
    const servicios = [
      {
        id: 1,
        categoria: "Programacion",
        nombre_servicio: "Desarrollo web",
        descripcion_servicio: "Desarrollo de paginas web con HTML, CSS y JS"
      },
      {
        id: 2,
        categoria: "Redes",
        nombre_servicio: "Mantenimiento de equipos",
        descripcion_servicio: "Mantenimiento de equipos de computo"
      },
      {
        id: 3,
        categoria: "Hardware",
        nombre_servicio: "Instalacion de software",
        descripcion_servicio: "Instalacion de software en equipos de computo"
      },{
        id: 4,
        categoria: "Software",
        nombre_servicio: "Desarrollo de software",
        descripcion_servicio: "Desarrollo de software a la medida"
      },{
        id: 5,
        categoria: "Seguridad",
        nombre_servicio: "Seguridad informatica",
        descripcion_servicio: "Seguridad informatica para empresas"
      },{
        id: 6,
        categoria: "Base de datos",
        nombre_servicio: "Mantenimiento de base de datos",
        descripcion_servicio: "Mantenimiento de base de datos"
      },{
        id: 7,
        categoria: "Administracion",
        nombre_servicio: "Administracion de servidores IBMi",
        descripcion_servicio: "Administracion de servidores IBMi  y Linux con implementacion de soluciones de alta disponibilidad"
      }
  
    ]
  return (
    <div>
      {/* Si Hay Servicios */}
      {servicios && servicios.length ? (
        <>
          <div className='grid grid-cols-4 gap-4 max-sm:grid-cols-1'>

          {servicios.map((servicios) => (
            //Quiero que la tarjeta reciba categoria, nombre de servicio y descripcion del servicio
            <TarjetaServicios key={servicios.id} categoria={servicios.categoria} nombre_servicio={servicios.nombre_servicio} descripcion_servicio={servicios.descripcion_servicio} />
          ))}
           </div>
        </>
      ) : (
        <>
        <div>
        <h2 className="font-black text-4xl text-center grid col-span-4">
            No tienes ningun servicio registrado
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Registra tus {""}
            <span className="text-primary-300 font-bold">
              Servicios Open
            </span>
          </p>
        </div>
        </>
      )}
    </div>
  );
};

export default GaleriaServiciosOpen