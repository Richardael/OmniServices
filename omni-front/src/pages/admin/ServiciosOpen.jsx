import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import TarjetaServicios from '../../components/servicios/TarjetaServicios'
import GaleriaServiciosOpen from '../../components/servicios/GaleriaServiciosOpen'
import BarraDeBusquedaOpen from '../../components/servicios/BarraDeBusquedaOpen'

const ServiciosOpen = () => {
  const [servicioss, setServicioss] = useState([]);
  const [categoria, setCategoria] = useState(""); // Nuevo estado para la categoría // Nuevo estado para la categoría
  useEffect(() => {
    //Obtengo los servicios desde mi backend y los almaceno en mi estado de servicios
 const obtenerServicios = async () => {
     const { data} = await axios.get('http://192.168.1.50:8000/servicios/open');
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
  return (
    <div>
    <BarraDeBusquedaOpen categoria={categoria} setCategoria={setCategoria} />
    <GaleriaServiciosOpen servicios={servicios} categoria={categoria} />
    </div>
  )
}

export default ServiciosOpen