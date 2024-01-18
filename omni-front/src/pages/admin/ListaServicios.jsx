import React from 'react'
import TablasServicios from '../../components/listas/TablasServicios'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'



const ListaServicios = () => {
  const [servicioss, setServicioss] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [updateCount, setUpdateCount] = useState(0);
  const [serviciosFiltrados, setServiciosFiltrados] = useState([]);

  useEffect(() => {
    //Obtengo los servicios desde mi backend y los almaceno en mi estado de servicios
    const obtenerServicios = async () => {
      const { data } = await axios.get('https://omniservices.onrender.com/lista/servicios');
      setServicioss(data);
    }
    obtenerServicios();
  }
    , [updateCount])

  const servicios = servicioss.map((servicios) => {
    return {
      id: servicios._id,
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
  }
  ) 
  //Usare mi barra de busqueda para filtrar servicios, por lo que debo importar mi componente BuscadorLista y mi
  //Estado de Busqueda

  const handleInputChange = (e) => {
    setBusqueda(e.target.value);
  }

  useEffect(() => {
    // Filtra los servicios cuando cambia la búsqueda
    const serviciosFiltrados = servicioss.filter((servicio) => {
      return servicio.nombre_servicio.toLowerCase().includes(busqueda.toLowerCase());
    });
    setServiciosFiltrados(serviciosFiltrados);
  }, [busqueda, servicioss]);

  return (
    <div>
    <div className='flex mb-6'>
    <div className="mb-4">
      <form className="w-[100vh] relative" action="">
        <input
        className="w-full px-4 py-3 rounded-lg ring-1 focus:outline-none focus:ring-1 ring-gray-300 focus:ring-primary-300"
        onChange={handleInputChange}
        type="text" placeholder="Buscar" />
        <button className="absolute bg-primary-300 ring-1 ring-primary-300 text-secondary-100 rounded-r-md py-3 px-4 right-0">Buscar</button>
      </form>
    </div>
      <div className='mx-auto relative w-full'>
      <h1 className="text-3xl font-extrabold text-center text-primary-900 mb-10">
        Lista <span className="text-primary-300"> Servicios</span>
      </h1>
      <Link to="/registro-servicios" className='absolute top-14 right-0'>
      <button className='text-primary-300 rounded-md pb-8 rounded-b-none text-xl mr-5 px-2 pt-2 w-full bg-gray-50 mx-auto font-bold text-primary-900 hover:underline '>
        Registrar Servicios
      </button>
      </Link>
      </div>
      </div>
      <TablasServicios servicios={serviciosFiltrados} updateCount={updateCount} setUpdateCount={setUpdateCount} />
    </div>
  )
}

export default ListaServicios