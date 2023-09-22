import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import AlertaBuena from '../alertas/AlertaBuena';
import AlertaMala from '../alertas/AlertaMala';

const FormRegistro = () => {
    const [categoria,setTCategoria] = useState("");
    const[nombre_servicio, setNombre_servicio] = useState("");
    const[descripcion_servicio, setDescripcion_servicio] = useState("");
    const [industria_atendida, setIndustria_atendida] = useState("");
    const[tiempo_estimado, setTiempo_estimado] = useState("");
    const[prioridad_servicio, setPrioridad_servicio] = useState("");
    const[costos_servicio, setCostos_servicio] = useState("");
    const[pre_requisitos, setPre_requisitos] = useState("");
    const[tarifa_servicio, setTarifa_servicio] = useState("");
    const[tipo_servicio, setTipo_servicio] = useState("");
    const[tipo_plataforma, setTipo_plataforma] = useState("");
    const[descripciont_servicio, setDescripciont_servicio] = useState("");
    const[disponibilidad_servicio, setDisponibilidad_servicio] = useState("");

    const [mostrarAlertaBuena, setMostrarAlertaBuena] = useState(false);
    const [alertaBuena, setAlertaBuena] = useState("");
    const [mostrarAlertaMala, setMostrarAlertaMala] = useState(false);
    const [alertaMala, setAlertaMala] = useState("");

    //Registrar por medio de axios
    const handleRegisterServices = async (e) => {
      e.preventDefault();
      //Implementar alertas negativas en caso de tener un campo vacio en mi registro de servicios
      if (categoria.length === 0 || nombre_servicio.length === 0 || descripcion_servicio.length === 0 || industria_atendida.length === 0 || tiempo_estimado.length === 0 || prioridad_servicio.length === 0 || costos_servicio.length === 0 || pre_requisitos.length === 0 || tarifa_servicio.length === 0 || tipo_servicio.length === 0 || tipo_plataforma.length === 0 || descripciont_servicio.length === 0 || disponibilidad_servicio.length === 0) {
        setMostrarAlertaMala(true);
        setTimeout(() => {
          setMostrarAlertaMala(false);
        }, 5000); // Ocultar la notificación después de 5000 ms (5 segundos)
        setAlertaMala("No puede haber campos vacios");
      } else {
      //Registrar por medio de axios
      try {
          const response = await axios.post(
            "http://192.168.1.50:8000/servicios/registro",
            {
              nombre_us: localStorage.getItem("nombre_us"),
              categoria,
              nombre_servicio,
              industria_atendida,
              descripcion_servicio,
              tiempo_estimado,
              prioridad_servicio,
              costos_servicio,
              pre_requisitos,
              tarifa_servicio,
              tipo_servicio,
              tipo_plataforma,
              descripciont_servicio,
              disponibilidad_servicio,
            }
          );
          const registroservicio = response.data;
          console.log(registroservicio);
          //Implementa un tiempo de respuesta esperado de 3s si no, arroja error
          
          setMostrarAlertaBuena(true);
          setTimeout(() => {
            setMostrarAlertaBuena(false);
          }, 5000); // Ocultar la notificación después de 5000 ms (5 segundos)
          setAlertaBuena("Registro de Servicio Exitoso");
          console.log(response);
        } catch (error) {
          setMostrarAlertaMala(true);
          setTimeout(() => {
            setMostrarAlertaMala(false);
          }, 5000); // Ocultar la notificación después de 5000 ms (5 segundos)
          setAlertaMala("Registro de Servicio Fallido");
          console.log(error);
      }
      }
    }
  return (
    <div>
<form
onSubmit={handleRegisterServices}
>
      <div className="grid grid-cols-4 gap-8 my-4 bg-white p-4 rounded-md shadow-md">
        {/* Tipo de Plataforma */}
        <select
          id="underline_select"
          className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
            onChange={(e) => setTipo_plataforma(e.target.value)}
            required
        >
          <option disabled selected>
            Tipo de Plataforma
          </option>
          <option value="IBM">IBM</option>
          <option value="Open">Open</option>
        </select>
        {/* Categoria */}
        <select
          id="underline_select"
          required
          className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
         onChange={(e) => setTCategoria(e.target.value)}
        >
          {tipo_plataforma === "" && (
            <option disabled selected>
              Elegir Tipo De Plataforma
            </option>
          )}
          {tipo_plataforma === "IBM" && (
            <optgroup label="IBM">
              <option disabled selected>
                Categoria
              </option>
              <option value="Operaciones">Operaciones</option>
              <option value="Administracion">Administración</option>
              <option value="Programacion">Programación</option>
              <option value="BaseDeDatos">Base de datos</option>
              <option value="Seguridad">Seguridad</option>
              <option value="Comunicaciones">Comunicaciones</option>
            </optgroup>
          )}
          {tipo_plataforma === "Open" && (
            <optgroup label="Open">
              <option disabled selected>
                Categoria
              </option>
              <option value="Programacion">Programación</option>
              <option value="Base de datos">Base de datos</option>
              <option value="Seguridad">Seguridad</option>
              <option value="Redes">Redes</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
            </optgroup>
          )}
        </select>
                {/* Tipo de Servicio */}
                <select
          id="underline_select"
          required
          className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
          onChange={(e) => setTipo_servicio(e.target.value)}
        >
          <option disabled selected>
            Tipo de Servicios
          </option>
          <option value="Servicio de Soporte">Servicio de Soporte</option>
          <option value="Servicio de Consultoria-Asesoria">Servicio de Consultoria-Asesoria</option>
          <option value="Servicio de Capacitacion">Servicio de Capacitacion</option>
          <option value="Servicio de Instalacion">Servicio de Instalacion</option>
          <option value="Servicio de Licenciamiento">Servicio de Licenciamiento</option>
          <option value="Servicio de Ventas">Servicio de Ventas</option>
          <option value="Servicio de Desarrollo">Servicio de Desarrollo</option>
        </select>
        {/* Industria Atendida */}
        <select
          id="underline_select"
          required
          className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
        onChange={(e) => setIndustria_atendida(e.target.value)}
        >
          <option disabled selected>
            Industria Atendida
          </option>
          <option value="Banca">Banca</option>
          <option value="Finanzas">Finanzas</option>
          <option value="Educacion">Educacion</option>
          <option value="Salud">Salud</option>
          <option value="Seguros">Seguros</option>
          <option value="Telecomunicaciones">Telecomunicaciones</option>
          <option value="Hosteleria">Hosteleria</option>
          <option value="Comercio Electronico">Comercio Electronico</option>
          <option value="Distribucion y Logistica">Distribucion y Logistica</option>
          <option value="Manufactura">Manufactura</option>
        </select>
      </div>
      
      <div className="grid grid-cols-4 gap-8 my-4 bg-white p-4 rounded-md shadow-md">
        {/* Nombre del Servicio */}
        <div>
          <label className="flex w-full relative">
            <input
              type="text"
              className="bg-transparent border-b-2  border-primary-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:border-primary-100 valid:border-primary-100"
              required
              onChange={(e) => setNombre_servicio(e.target.value)}
            />
            <span className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-secondary-900 flex items-center gap-2">
              Nombre del Servicio <span className="text-red-500">*</span>
            </span>
          </label>
        </div>
                {/* Prioridad del Servicio */}
                <select
          id="underline_select"
          className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
        onChange={(e) => setPrioridad_servicio(e.target.value)}
        required
        >
          <option disabled selected>
            Prioridad del Servicio
          </option>
          <option value="Muy Alta">Muy Alta</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
          <option value="Muy Baja">Muy Baja</option>
          <option value="Planificado">Planificado</option>
        </select>
        {/* Disponibilidad */}
        <select
          id="underline_select"
          required
          className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
         onChange={(e) => setDisponibilidad_servicio(e.target.value)}
        >
          <option disabled selected>
            Disponibilidad 
          </option>
          <option value="24/7">24/7</option>
          <option value="8/5">8/5</option>
          <option value="8/7">8/7</option>
          <option value="8/6">8/6</option>
          <option value="8/4">8/4</option>
          <option value="9/5">9/5</option>
          <option value="9/7">9/7</option>
        </select>
        {/* Pre-requisitos */}
        <div>
          <label className="flex w-full relative">
            <input
              type="text"
              className="bg-transparent border-b-2  border-primary-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:border-primary-100 valid:border-primary-100"
              required
              onChange={(e) => setPre_requisitos(e.target.value)}
            />
            <span className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-secondary-900 flex items-center gap-2">
              Pre-Requisitos <span className="text-red-500">*</span>
            </span>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 bg-white p-4 rounded-md shadow-md">

        {/* Costos */}
        <div>
          <label className="flex w-full relative">
            <input
              type="number"
              className="bg-transparent border-b-2  border-primary-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:border-primary-100 valid:border-primary-100"
              required
              onChange={(e) => setCostos_servicio(e.target.value)}
            />
            <span className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-secondary-900 flex items-center gap-2">
              Costos del Servicio <span className="text-red-500">*</span>
            </span>
          </label>
        </div>
        {/* Tarifa */}
        <div>
          <label className="flex w-full relative">
            <input
              type="number"
              className="bg-transparent border-b-2  border-primary-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:border-primary-100 valid:border-primary-100"
              required
              onChange={(e) => setTarifa_servicio(e.target.value)}
            />
            <span className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-secondary-900 flex items-center gap-2">
              Tarifa del Servicio <span className="text-red-500">*</span>
            </span>
          </label>
        </div>
        {/* Tiempo Estimado */}
        <div>
          <label className="flex w-full relative">
            <input
              type="number"
              className="bg-transparent border-b-2  border-primary-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:border-primary-100 valid:border-primary-100"
              required
              onChange={(e) => setTiempo_estimado(e.target.value)}
            />
            <span className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-secondary-900 flex items-center gap-2">
              Tiempo Estimado (horas)<span className="text-red-500">*</span>
            </span>
          </label>
        </div>
      </div>
      <div className="my-4 bg-white p-4 rounded-md shadow-md grid grid-cols-2">
        {/* Descripcion */}
        <div className="my-4 mx-5">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 px-2"
          >
            Descripcion del Servicio
            <span className="text-red-500"> *</span>
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-secondary-900 bg-gray-50 border-2 border-primary-300 appearance-none outline-none focus:border-2 focus:border-primary-100 rounded-md"
            placeholder="Escribe una breve descripcion del servicio"
            onChange={(e) => setDescripcion_servicio(e.target.value)}
            required
          ></textarea>
        </div>
        {/* Descripcion Tecnica */}
        <div className="my-4 mx-5">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 px-2"
          >
            Descripcion Tecnica del Servicio
            <span className="text-red-500"> *</span>
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-secondary-900 bg-gray-50 border-2 border-primary-300 appearance-none outline-none focus:border-2 focus:border-primary-100 rounded-md"
            placeholder="Escribe una breve descripcion tecnica del servici
            requiredo y el como se lleva a cabo el mismo"
            onChange={(e) => setDescripciont_servicio(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className='text-center'>
      <button
      className="bg-primary-300 py-2 px-4 text-white rounded-md hover:bg-primary-200 transition-colors">
        Registrar Servicios
      </button>
      </div>
    </form>
            <AlertaMala
        mostrarAlertaMala={mostrarAlertaMala}
        alertaMala={alertaMala}
      />

      <AlertaBuena
        mostrarAlertaBuena={mostrarAlertaBuena}
        alertaBuena={alertaBuena}
      />
    </div>
  )
}

export default FormRegistro