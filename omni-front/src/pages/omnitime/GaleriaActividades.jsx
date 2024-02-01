import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TarjetaActividad from './TarjetaActividad'
import { Link } from 'react-router-dom'


const GaleriaActividades = () => {
    const [actividadesObtenidas, setActividadesObtenidas] = useState([]);
      //Estados de crear Actividad
  const [nombreActividad, setNombreActividad] = useState("");
  const [contadorActualizarComponente, setContadorActualizarComponente] = useState(0);
  const [buscarActividad, setBuscarActividad] = useState("");

  //loader
  const [loading, setLoading] = useState(false);
    //Obtener el usuario actual
  const id_usuario = localStorage.getItem('id_usuario');

  //Obtener actividades
  const obtenerActividades = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`https://clockigenial2.onrender.com/lista/actividades-por-usuario-no-completado/${id_usuario}`)
      setActividadesObtenidas(data.actividadesNoCompletadas)
      if (data.actividadesNoCompletadas.length) {
        setLoading(false)
      }
    }
    catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  //Ejecutar la funcion para obtener las actividades
  useEffect(() => {
    obtenerActividades()
  }, [contadorActualizarComponente])

  console.log(actividadesObtenidas)
            
  return (
    <div className='m-4 items-center justify-center overflow-hidden'>
    <div className='flex-1'>
    {actividadesObtenidas.length ? (
<>
      {/* Barra de Busqueda */}
      <div className="grid grid-cols-3 gap-10 items-center justify-between mb-5">
        <div>

        </div>
        <input
          type="text"
          placeholder="Buscar Actividad"
          className="border-gray-200 rounded-lg px-4 py-2 w-full max-w-lg focus:outline-none"
          value={buscarActividad}
          onChange={(e) => setBuscarActividad(e.target.value)}
        />
            <Link
            className='flex justify-end items-center'
            to='/omnitime/crear-actividad'>
    <button
    className='bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full'>
    Crear Actividad
    </button>
    </Link>
      </div>
  <div className='grid grid-cols-3 gap-4 py-2 max-sm:grid-cols-1 overflow-y-scroll max-h-[57vh]'>
  {actividadesObtenidas.filter((actividad) => {
    if (buscarActividad === "") {
      return actividad
    } else if (actividad.nombre_actividad.toLowerCase().includes(buscarActividad.toLowerCase())) {
      return actividad
    }
  }).map((actividad) => (
      <TarjetaActividad key={actividad.id_actividad } {...actividad} setContadorActualizarComponente={setContadorActualizarComponente} contadorActualizarComponente={contadorActualizarComponente}/>
    ))}
    </div>
</>
)
: (
<>
<div className='flex flex-col items-center justify-center'>
<h2 className="font-black text-4xl text-center grid col-span-3">
    No tienes ninguna actividad registrada
  </h2>
  {loading ? (
    <div
   className="inline-block mt-4 text-violet-600 h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
  role="status">
  <span
     className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span>
</div>
  ) : null}
  <p className="text-xl mt-5 mb-10 text-center">
    Registra tus {""}
    <span className="text-violet-600 font-bold">
      Actividades
    </span>
  </p>
  <Link
            className='flex justify-end items-center'
            to='/omnitime/crear-actividad'>
    <button
    className='bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full'>
    Crear Actividad
    </button>
    </Link>
</div>
</>
)}
</div>
</div>
  )
}

export default GaleriaActividades