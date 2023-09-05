//Registrare los servicios en mi base de datos con el siguiente formulario
//Poseera los siguientes campos para registrar en el siguiente orden : Tipo de Plataforma (Select), Tipo de Servicio (Select), Categoria (Select), Prioridad (Select)
//En la siguiente fila sera Nombre del servicio (input), disponibilidad (select), pre-requisitos (input)
//En la siguiente fila sera costos (input), tarifa (input), tiempo estimado (input)
//y en la ultima fila seran descripcion (textarea) y descripcion tecnica (textarea)
import React from "react";
import { useState } from "react";

const RegistrarServicios = () => {
    const [tPlataforma, setTPlataforma] = useState("");
  return (
    <form>
      <div className="grid grid-cols-4 gap-8 my-4 bg-white p-4 rounded-md shadow-md">
        {/* Tipo de Plataforma */}
        <select
          id="underline_select"
          className="block py-2.5 pl-2 w-full font-semibold text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
        >
          <option disabled selected>Tipo de Plataforma</option>
            <option value="">IBM</option>
            <option value="">Open</option>
        </select>
        {/* Tipo de Servicio */}
        <select
          id="underline_select"
          className="block py-2.5 pl-2 w-full font-semibold text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
        >
          <option disabled selected>Tipo de Servicios</option>
            <option value="">IBM</option>
            <option value="">Open</option>

        </select>
{/* Categoria */}
<select
  id="underline_select"
  className="block py-2.5 pl-2 w-full font-semibold text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
>
  {tPlataforma === "IBM" && (
    <optgroup label="IBM">
          <option disabled selected>Categoria</option>
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
          <option disabled selected>Categoria</option>
      <option value="Programacion">Programación</option>
      <option value="BaseDeDatos">Base de datos</option>
      <option value="Seguridad">Seguridad</option>
      <option value="Redes">Redes</option>
      <option value="Hardware">Hardware</option>
      <option value="Software">Software</option>
    </optgroup>
  )}
</select>

        {/* Prioridad */}
        <select
          id="underline_select"
          className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        >
          <option selected>Prioridad</option>
          <option value="">IBM</option>
          <option value="">Linux</option>
          <option value="">Windows</option>
          <option value="">Mac</option>
        </select>
        </div>
        <div className="grid grid-cols-3 gap-8 my-4 bg-white p-4 rounded-md shadow-md">
        {/* Nombre del Servicio */}
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nombre del Servicio
          </label>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
          />
        </div>
        {/* Disponibilidad */}
        <select
          id="underline_select"
          className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        >
          <option selected>Disponibilidad</option>
          <option value="">IBM</option>
          <option value="">Linux</option>
          <option value="">Windows</option>
          <option value="">Mac</option>
        </select>
        {/* Pre-requisitos */}
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Pre-Requisitos
          </label>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
          />
        </div>
        </div>
        <div className="grid grid-cols-3 gap-8 bg-white p-4 rounded-md shadow-md">
        {/* Costos */}
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Costos
          </label>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
          />
        </div>
        {/* Tarifa */}
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tarifa
          </label>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
          />
        </div>
        {/* Tiempo Estimado */}
        <div className="">
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tiempo Estimado
          </label>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
          />
        </div>
        </div>
        <div className="my-4 bg-white p-4 rounded-md shadow-md">
            {/* Descripcion */}
        <div className="my-4">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Descripcion
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>
        {/* Descripcion Tecnica */}
        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Descripcion Tecnica
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>
      </div>
    </form>
  );
};

export default RegistrarServicios;
