import React from 'react'
import axios from 'axios'; // Importo axios
import { useState } from 'react'; // Importo el useState para poder usarlo
const FormRegistroTalleres = () => {
    const [tipo_plataforma, setTipo_plataforma] = useState("");
    const [categoria, setCategoria] = useState("");
    const [nombre_taller, setNombre_taller] = useState("");
    const [descripcion_taller, setDescripcion_taller] = useState("");
    const [publico_taller, setPublico_taller] = useState("");
    const [pre_conocimientos, setPre_conocimientos] = useState("");
    const [temario_taller, setTemario_taller] = useState("");
    const [obj_general, setObj_general] = useState("");
    const [duracion_taller, setDuracion_taller] = useState("");
    const [modalidad_taller, setModalidad_taller] = useState("");
    const [cantidad_participantes, setCantidad_participantes] = useState("");

    //Registrar por medio de axios
    const handleRegisterTalleres = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(
            "http://192.168.1.50:8000/talleres/registro",
            {
              tipo_plataforma,
              categoria,
              nombre_taller,
              descripcion_taller,
              publico_taller,
              pre_conocimientos,
              temario_taller,
              obj_general,
              duracion_taller,
              modalidad_taller,
              cantidad_participantes,
            }
            );
            console.log(response);
        }
        catch (error) {
          console.log(error);
        }
        }
  return (
<form
onSubmit={handleRegisterTalleres}
>
      <div className="grid grid-cols-3 gap-8 my-4 bg-white p-4 rounded-md shadow-md">
        {/* Tipo de Plataforma */}
        <select
          id="underline_select"
          className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
            onChange={(e) => setTipo_plataforma(e.target.value)}
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
          className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
         onChange={(e) => setCategoria(e.target.value)}
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
        {/* Publico Taller */}
        <select
          id="underline_select"
          className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
        onChange={(e) => setPublico_taller(e.target.value)}
        >
          <option disabled selected>
            Publico Taller
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
              onChange={(e) => setNombre_taller(e.target.value)}
            />
            <span className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-secondary-900 flex items-center gap-2">
              Nombre del Taller <span className="text-red-500">*</span>
            </span>
          </label>
        </div>
                {/* Modalidad Taller */}
                <select
          id="underline_select"
          className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
        onChange={(e) => setModalidad_taller(e.target.value)}
        >
          <option disabled selected>
            Modalidad Taller
          </option>
          <option value="Presencial">Presencial</option>
          <option value="Online">Online</option>
        </select>
        {/* Pre-requisitos */}
        <div>
          <label className="flex w-full relative">
            <input
              type="text"
              className="bg-transparent border-b-2  border-primary-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:border-primary-100 valid:border-primary-100"
              required
              onChange={(e) => setPre_conocimientos(e.target.value)}
            />
            <span className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-secondary-900 flex items-center gap-2">
              Pre-Conocimientos <span className="text-red-500">*</span>
            </span>
          </label>
        </div>
                {/* Obj General */}
                <div>
          <label className="flex w-full relative">
            <input
              type="text"
              className="bg-transparent border-b-2  border-primary-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:border-primary-100 valid:border-primary-100"
              required
              onChange={(e) => setObj_general(e.target.value)}
            />
            <span className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-secondary-900 flex items-center gap-2">
              Objetivo General <span className="text-red-500">*</span>
            </span>
          </label>
        </div>
      </div>
      <div className='grid grid-cols-2 bg-white gap-8 p-4 rounded-md shadow-md mb-4'>
        {/* Duracion Talleres */}
        <div>
          <label className="flex w-full relative">
            <input
              type="number"
              className="bg-transparent border-b-2  border-primary-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:border-primary-100 valid:border-primary-100"
              required
              onChange={(e) => setDuracion_taller(e.target.value)}
            />
            <span className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-secondary-900 flex items-center gap-2">
              Duracion Taller <span className="text-red-500">*</span>
            </span>
          </label>
        </div>
        {/* Cantidad Participantes */}
        <div>
          <label className="flex w-full relative">
            <input
              type="number"
              className="bg-transparent border-b-2  border-primary-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:border-primary-100 valid:border-primary-100"
              required
              onChange={(e) => setCantidad_participantes(e.target.value)}
            />
            <span className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-secondary-900 flex items-center gap-2">
              Cantidad Participantes <span className="text-red-500">*</span>
            </span>
          </label>
        </div>
        {/* Cantidad Participantes */}
      </div>
      <div className="grid grid-cols-2 gap-8 bg-white p-4 rounded-md shadow-md">

        {/* Descripcion Taller */}
        <div className="my-4 mx-5">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 px-2"
          >
            Descripcion Taller
            <span className="text-red-500"> *</span>
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-secondary-900 bg-gray-50 border-2 border-primary-300 appearance-none outline-none focus:border-2 focus:border-primary-100 rounded-md"
            placeholder="Escribe una breve descripcion del taller"
            onChange={(e) => setDescripcion_taller(e.target.value)}
          ></textarea>
        </div>
        {/* Temario Taller (Textarea) */}
        <div className="my-4 mx-5">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 px-2"
          >
            Temario Taller
            <span className="text-red-500"> *</span>
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-secondary-900 bg-gray-50 border-2 border-primary-300 appearance-none outline-none focus:border-2 focus:border-primary-100 rounded-md"
            placeholder="Escribe el temario del taller detalladamente"
            onChange={(e) => setTemario_taller(e.target.value)}
          ></textarea>
      </div>
      </div>
      <div className='text-center'>
      <button
      className="bg-primary-300 py-2 px-4 mt-5 text-white rounded-md hover:bg-primary-200 transition-colors">
        Registrar Taller
      </button>
      </div>
    </form>
  )
}

export default FormRegistroTalleres