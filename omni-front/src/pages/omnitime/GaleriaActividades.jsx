import React from 'react'
import axios from 'axios'

const GaleriaActividades = () => {
    const [actividadesObtenidas, setActividadesObtenidas] = React.useState([]);
      //Estados de crear Actividad
  const [nombreActividad, setNombreActividad] = React.useState("");


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
    //Mostrar Actividades obtenidas en formato json
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-gray-700">Actividades</h1>
      <button
    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      onClick={obtenerActividades}>Obtener Actividades</button>
      <ul>
        {
          actividadesObtenidas.map((actividad) => {
            return (
              <li key={actividad.id_actividad}>
                {actividad.nombre_actividad}
              </li>
            )
          })
        }
      </ul>
      {/* Registrar Actividad */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-700">Registrar Actividad</h1>
        <input
          type="text"
          placeholder="Nombre de la actividad"
          onChange={(e) => setNombreActividad(e.target.value)}
        />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={crearActividad}>Crear Actividad</button>
      </div>
    </div>
  )
}

export default GaleriaActividades