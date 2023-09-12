import React, { useState,useEffect } from 'react'
import axios from 'axios'
import TarjetaServicios from './TarjetaServicios'
//Quiero que mi galeria de Servicios muestre todos los servicios que tengo en mi base de datos estoy usando Mysql
//Para eso voy a usar un hook de react que se llama useEffect
//useEffect me permite ejecutar codigo de manera condicional
//useEffect recibe dos parametros, el primero es una funcion anonima y el segundo es un arreglo de dependencias
//Si el arreglo de dependencias esta vacio, la funcion anonima se ejecuta una sola vez cuando el componente se renderiza por primera vez
//Si el arreglo de dependencias tiene elementos, la funcion anonima se ejecuta cada vez que alguno de los elementos del arreglo de dependencias cambia
//Si el arreglo de dependencias no existe, la funcion anonima se ejecuta cada vez que el componente se renderiza

const GaleriaServiciosIBM = () => {
  const [servicioss, setServicioss] = useState([]);
    useEffect(() => {
      //Obtengo los servicios desde mi backend y los almaceno en mi estado de servicios
   const obtenerServicios = async () => {
       const { data} = await axios.get('http://192.168.1.43:8000/servicios/ibm');
       setServicioss(data);
   }
   //Aca quiero exportar las categorias, nombre y descripcion en forma de un array para mis tarjetas
    obtenerServicios();
    }, [])
    //Estos son los campos id_servicio,categoria,nombre_servicio,descripcion_servicio,tiempo_estimado,prioridad_servicio,costos_servicio,pre_requisitos,tarifa_servicio,tipo_servicio,tipo_plataforma,descripciont_servicio, disponibilidad_servicio, industria_atendida
    const servicios = servicioss.map((servicios) => {
      return {
        id: servicios.id_servicio,
        categoria: servicios.categoria,
        nombre_servicio: servicios.nombre_servicio,
        descripcion_servicio: servicios.descripcion_servicio,
        tiempo_estimado: servicios.tiempo_estimado,
        prioridad_servicio: servicios.prioridad_servicio,
        costos_servicio: servicios.costos_servicio,
        pre_requisitos: servicios.pre_requisitos,
        tarifa_servicio: servicios.tarifa_servicio,
        tipo_servicio: servicios.tipo_servicio,
        tipo_plataforma: servicios.tipo_plataforma,
        descripciont_servicio: servicios.descripciont_servicio,
        disponibilidad_servicio: servicios.disponibilidad_servicio,
        industria_atendida: servicios.industria_atendida,
      }
    })
  //Quiero que implementes ejemplos de servicios del AS/400
  //Quiero que las categorias sean: programacion, seguridad, administracion, comunicacion, administracion, base de datos y operaciones
  return (
    <div>
            {/* Si Hay Servicios */}
            {servicios && servicios.length ? (
        <>
          <div className='grid grid-cols-4 gap-4 max-sm:grid-cols-1'>

          {servicios.map((servicios) => (
            //Quiero que la tarjeta reciba todos los datos de mis tarjetas de ejemplos
            <TarjetaServicios key={servicios.id} {...servicios} />
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
              Servicios IBM
            </span>
          </p>
        </div>
        </>
      )}
    </div>
  )
}

export default GaleriaServiciosIBM