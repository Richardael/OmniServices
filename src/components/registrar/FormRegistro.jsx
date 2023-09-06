import React from 'react'
import { useState } from 'react';

const FormRegistro = () => {
    const [tPlataforma, setTPlataforma] = useState("");
  return (
<form>
      <div className="grid grid-cols-4 gap-8 my-4 bg-white p-4 rounded-md shadow-md">
        {/* Tipo de Plataforma */}
        <select
          id="underline_select"
          className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
            onChange={(e) => setTPlataforma(e.target.value)}
        >
          <option disabled selected>
            Tipo de Plataforma
          </option>
          <option value="IBM">IBM</option>
          <option value="Open">Open</option>
        </select>
        {/* Tipo de Servicio */}
        <select
          id="underline_select"
          className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
        >
          <option disabled selected>
            Tipo de Servicios
          </option>
          <option value="">IBM</option>
          <option value="">Open</option>
        </select>
        {/* Categoria */}
        <select
          id="underline_select"
          className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
        >
          {tPlataforma === "" && (
            <option disabled selected>
              Elegir Tipo De Plataforma
            </option>
          )}
          {tPlataforma === "IBM" && (
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
          {tPlataforma === "Open" && (
            <optgroup label="Open">
              <option disabled selected>
                Categoria
              </option>
              <option value="Programacion">Programación</option>
              <option value="BaseDeDatos">Base de datos</option>
              <option value="Seguridad">Seguridad</option>
              <option value="Redes">Redes</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
            </optgroup>
          )}
        </select>

        {/* Prioridad del Servicio */}
        <select
          id="underline_select"
          className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
        >
          <option disabled selected>
            Prioridad del Servicio
          </option>
          <option value="">Muy Alta</option>
          <option value="">Alta</option>
          <option value="">Media</option>
          <option value="">Baja</option>
          <option value="">Muy Baja</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-8 my-4 bg-white p-4 rounded-md shadow-md">
        {/* Nombre del Servicio */}
        <div>
          <label className="flex w-full relative">
            <input
              type="text"
              className="bg-transparent border-b-2  border-primary-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:border-primary-100 valid:border-primary-100"
              required
            />
            <span className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-secondary-900 flex items-center gap-2">
              Nombre del Servicio <span className="text-red-500">*</span>
            </span>
          </label>
        </div>
        {/* Disponibilidad */}
        <select
          id="underline_select"
          className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
        >
          <option disabled selected>
            Disponibilidad 
          </option>
          <option value="">24/7</option>
          <option value="">8/5</option>
          <option value="">8/7</option>
          <option value="">8/6</option>
          <option value="">8/4</option>
        </select>
        {/* Pre-requisitos */}
        <div>
          <label className="flex w-full relative">
            <input
              type="text"
              className="bg-transparent border-b-2  border-primary-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:border-primary-100 valid:border-primary-100"
              required
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
            placeholder="Escribe una breve descripcion tecnica del servicio y el como se lleva a cabo el mismo"
          ></textarea>
        </div>
      </div>
    </form>
  )
}

export default FormRegistro