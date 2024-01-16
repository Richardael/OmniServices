import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TarjetaActividad from './TarjetaActividad'

const GaleriaActividades = () => {
    const [actividadesObtenidas, setActividadesObtenidas] = useState([]);
      //Estados de crear Actividad
  const [nombreActividad, setNombreActividad] = useState("");


    //Obtener el usuario actual
  const id_usuario = localStorage.getItem('id_usuario');

  //Obtener actividades
  const obtenerActividades = async () => {
    try {
      const { data } = await axios.get(`http://192.168.1.10:7000/lista/actividades-por-usuario-no-completado/${id_usuario}`)
      setActividadesObtenidas(data.actividadesNoCompletadas)
    }
    catch (error) {
      console.log(error)
    }
  }

  //Ejecutar la funcion para obtener las actividades
  useEffect(() => {
    obtenerActividades()
  }, [])

  console.log(actividadesObtenidas)

    //Crear Actividad
    const crearActividad = () => {
        //Crear actividad
        if (nombreActividad === "") {
          alert("El nombre de la actividad no puede estar vacío");
          return;
        }

        console.log("Actividad creada");
        const actividad = {
          nombre_actividad: nombreActividad,
          id_usuario: id_usuario,
          segundos: 0,
          minutos: 0,
          horas: 0,
        };
        axios
          .post("http://192.168.1.10:7000/actividad/registro-actividad", actividad)
            .then((response) => {
                console.log(response);
                alert("Actividad creada");
                }
            )
            .catch((error) => {
                console.log(error);
                alert("Error al crear la actividad");
            }
        );
    }
            
  return (
    <div className='m-4 items-center justify-center'>
    <div className='flex-1'>
    {actividadesObtenidas.length ? (
<>
      {/* Barra de Busqueda */}
      <div className="flex flex-col items-center justify-center my-5">
        <input
          type="text"
          placeholder="Buscar Actividad"
          className="border-gray-200 rounded-lg px-4 py-2 w-full max-w-lg focus:outline-none"
        />
      </div>
  <div className='grid grid-cols-3 gap-4 max-sm:grid-cols-1'>
  {actividadesObtenidas.map((actividad) => (
      <TarjetaActividad key={actividad.id_actividad } {...actividad} />
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
  <p className="text-xl mt-5 mb-10 text-center">
    Registra tus {""}
    <span className="text-violet-600 font-bold">
      Actividades
    </span>
  </p>
</div>
</>
)}
</div>
</div>
  )
}

export default GaleriaActividades