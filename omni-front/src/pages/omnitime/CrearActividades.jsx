import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  RiCheckboxBlankLine,
  RiCheckboxCircleLine,
  RiCheckboxLine,
} from "react-icons/ri";
import AlertaMala from "../../components/alertas/AlertaMala";
import AlertaBuena from "../../components/alertas/AlertaBuena";

const CrearActividades = () => {
  //Estados de crear Actividad
  const [nombreActividad, setNombreActividad] = useState("");
  const [proyectoActividad, setProyectoActividad] = useState("");
  const [facturableActividad, setFacturableActividad] = useState(false);
  const [tarifaActividad, setTarifaActividad] = useState(0);
  //Traer Proyectos
  const [proyectos, setProyectos] = React.useState([]);

  //Estado usuario localStorage
  const id_usuario = localStorage.getItem("id_usuario");

  //Estado de tiempo por default
  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [horas, setHoras] = useState(0);

  //Estados de alerta
  const [mostrarAlertaMala, setMostrarAlertaMala] = useState(false);
  const [alertaMala, setAlertaMala] = useState("");
  const [mostrarAlertaBuena, setMostrarAlertaBuena] = useState(false);
  const [alertaBuena, setAlertaBuena] = useState("");

  //Obtener Proyectos
  const obtenerProyectos = async () => {
    try {
      const { data } = await axios.get(
        `https://clockigenial2.onrender.com/lista/proyectos-por-usuario/${id_usuario}`
      );
      setProyectos(data.proyectosUsuario);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    obtenerProyectos();
  }, []);

  //Crear actividad
  const crearActividad = (e) => {
    //preventdefault
    e.preventDefault();
    //Validar campos
    if (nombreActividad === "") {
      setMostrarAlertaMala(true);
      setTimeout(() => {
        setMostrarAlertaMala(false);
      }, 5000); // Ocultar la notificación después de 5000 ms (5 segundos)
      setAlertaMala("El nombre de la actividad no puede estar vacío");
      return;
    }
    if (facturableActividad === true && tarifaActividad === 0) {
      setMostrarAlertaMala(true);
      setTimeout(() => {
        setMostrarAlertaMala(false);
      }, 5000); // Ocultar la notificación después de 5000 ms (5 segundos)
      setAlertaMala("La tarifa no puede ser 0 si la actividad es facturable");

      return;
    }
    if (facturableActividad === false && tarifaActividad !== 0) {
      setMostrarAlertaMala(true);
      setTimeout(() => {
        setMostrarAlertaMala(false);
      }, 5000); // Ocultar la notificación después de 5000 ms (5 segundos)
      setAlertaMala(
        "La tarifa no puede ser diferente de 0 si la actividad no es facturable"
      );
      return;
    }
    console.log("Actividad creada");
    const actividad = {
      nombre_actividad: nombreActividad,
      id_usuario: id_usuario,
      id_proyecto: proyectoActividad,
      //Convertir en valores int
      tarifa: parseInt(tarifaActividad),
      segundos: parseInt(segundos),
      minutos: parseInt(minutos),
      horas: parseInt(horas),
    };
    axios
      .post(
        "https://clockigenial2.onrender.com/actividad/registro-actividad",
        actividad
      )
      .then((res) => {
        setMostrarAlertaBuena(true);
        setTimeout(() => {
          setMostrarAlertaBuena(false);
        }, 5000); // Ocultar la notificación después de 5000 ms (5 segundos)
        setAlertaBuena("Actividad creada correctamente");
      })
      .catch((error) => {
        console.log(error);
        setMostrarAlertaMala(true);
        setTimeout(() => {
          setMostrarAlertaMala(false);
        }, 5000); // Ocultar la notificación después de 5000 ms (5 segundos)
        setAlertaMala("Hubo un error al crear la actividad");
      });
    //Reiniciar los estados
    setNombreActividad("");
    setProyectoActividad("");
    setFacturableActividad(false);
    setTarifaActividad(0);
  };

  return (
    <div className="flex-1">
      <div className="flex-1 flex-col my-5 px-10 w-full">
        <div className="max-w-md mx-auto py-4 px-8 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Registra tu Actividad</h2>
          <form onSubmit={crearActividad} className="space-y-6">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nombre de la Actividad
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nombre de la Actividad"
                value={nombreActividad}
                onChange={(e) => setNombreActividad(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-violet-600"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="proyecto"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Proyecto de la Actividad
              </label>
              <select
                id="proyecto"
                name="proyecto"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-violet-600"
                value={proyectoActividad}
                onChange={(e) => setProyectoActividad(e.target.value)}
              >
                <option value="">Selecciona un proyecto</option>
                {proyectos.map((proyecto) => (
                  <option
                    key={proyecto.id_proyecto}
                    value={proyecto.id_proyecto}
                  >
                    {proyecto.nombre_proyecto}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <div className="flex flex-row justify-between">
                {/* Switch de On/Off en relacion a si es facturable o no*/}
                <div className="flex flex-row items-center">
                  {facturableActividad ? (
                    <RiCheckboxLine
                      className="text-3xl text-violet-600 cursor-pointer select-none"
                      onClick={() => setFacturableActividad(false)}
                    />
                  ) : (
                    <RiCheckboxBlankLine
                      className="text-3xl text-secondary-300 cursor-pointer select-none"
                      onClick={() => setFacturableActividad(true)}
                    />
                  )}
                  <label
                    htmlFor="facturable"
                    className="text-gray-700 text-base items-center flex justify-center font-bold mb-2"
                  >
                    ¿Es Facturable?
                  </label>
                </div>
                {/* Tarifa */}
                {facturableActividad ? (
                  <div>
                    <input
                      type="text"
                      id="tarifa"
                      name="tarifa"
                      placeholder="Tarifa por hora"
                      value={tarifaActividad}
                      onChange={(e) => setTarifaActividad(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-violet-600"
                    />
                  </div>
                ) : null}
              </div>
            </div>
            <button
              type="submit"
              className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 focus:outline-none focus:shadow-outline-violet mx-auto w-full"
            >
              Crear Actividad
            </button>
          </form>
        </div>
        {/* Boton de Regresar */}
        <div className="flex justify-center mt-5">
          <button
            className="bg-secondary-300 text-white px-4 py-2 rounded-md hover:bg-secondary-400 focus:outline-none focus:shadow-outline-violet mx-auto w-1/4"
            onClick={() => window.history.back()}
          >
            Regresar
          </button>
        </div>
      </div>
      <AlertaMala
        mostrarAlertaMala={mostrarAlertaMala}
        alertaMala={alertaMala}
      />

      <AlertaBuena
        mostrarAlertaBuena={mostrarAlertaBuena}
        alertaBuena={alertaBuena}
      />
    </div>
  );
};

export default CrearActividades;
