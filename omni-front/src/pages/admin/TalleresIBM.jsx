import React from 'react'
import BarraDeBúsquedaIBM from '../../components/servicios/BarraDeBusquedaIBM'
import GaleriaTalleresIBM from '../../components/talleres/GaleriaTalleresIBM'
import axios from 'axios'
import { useState, useEffect } from 'react'

const TalleresIBM = () => {
  const [talleress, setTalleress] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState(""); // Nuevo estado para la categoría // Nuevo estado para la categoría
  useEffect(() => {
    //Obtengo los servicios desde mi backend y los almaceno en mi estado de servicios
 const obtenerTalleres = async () => {
     const { data} = await axios.get('https://omniservices.onrender.com/talleres/ibm');
     setTalleress(data);
 }
 //Aca quiero exportar las categorias, nombre y descripcion en forma de un array para mis tarjetas
  obtenerTalleres();
  }, [])
        //Estos son los campos id_servicio,categoria,nombre_servicio,descripcion_servicio,tiempo_estimado,prioridad_servicio,costos_servicio,pre_requisitos,tarifa_servicio,tipo_servicio,tipo_plataforma,descripciont_servicio, disponibilidad_servicio, industria_atendida
        const talleres = talleress.map((talleres) => {
          return {
            id: talleres.id_taller,
            categoria: talleres.categoria,
            tipo_plataforma: talleres.tipo_plataforma,
            nombre_taller: talleres.nombre_taller,
            descripcion_taller: talleres.descripcion_taller,
            publico_taller: talleres.publico_taller,
            pre_conocimientos: talleres.pre_conocimientos,
            temario_taller: talleres.temario_taller,
            obj_general: talleres.obj_general,
            duracion_taller: talleres.duracion_taller,
            modalidad_taller: talleres.modalidad_taller,
            cantidad_participantes: talleres.cantidad_participantes,
          }
        })
  return (
    <div>
      <BarraDeBúsquedaIBM categoria={categoria} setCategoria={setCategoria} busqueda={busqueda} setBusqueda={setBusqueda}/>
      <GaleriaTalleresIBM talleres={talleres} categoria={categoria} busqueda={busqueda}/>
    </div>
  )
}

export default TalleresIBM