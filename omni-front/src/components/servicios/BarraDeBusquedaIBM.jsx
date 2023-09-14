import React from "react";
import { useState } from "react";
//Quiero una barra de búsqueda que me permita buscar servicios por nombre
//Quiero que la barra de búsqueda me permita buscar servicios por categoría
const BarraDeBúsquedaIBM = ({servicios, categoria, setCategoria}) => {
  const user = localStorage.getItem("user_us");
    const [serviciosFiltrados, setServiciosFiltrados] = useState(servicios);
  // Función para manejar el clic en los botones de categoría
  const handleCategoriaClick = (categoria) => {
    //Si servicios filtrados es igual a categoria, setcategoria sera ""
    if (serviciosFiltrados === categoria) {
      setCategoria("");
      setServiciosFiltrados("")
    } else {
      //Si no, setcategoria sera igual a categoria
      setCategoria(categoria);
      setServiciosFiltrados(categoria)
    }

  };




  return (
    <div className="mb-10 bg-white p-4 shadow-md">
    <div className="px-2 py-2 relative flex">
    <div className="2/5">
           <h1 className="font-semibold text-2xl py-2 pr-24 pl-4">Bienvenido <span className="text-primary-300">{user}</span></h1> 
        </div>
      <form className="w-3/5" action="">
        <input
        className="w-full px-4 py-3 rounded-lg ring-1 focus:outline-none focus:ring-1 ring-gray-300 focus:ring-primary-300"
        type="text" placeholder="Buscar en IBM" />
        <button className="absolute bg-primary-300 ring-1 ring-primary-300 text-secondary-100 rounded-r-md py-3 px-4 right-5 hover:bg-primary-200">Buscar</button>
      </form>
    </div>
          <div className="grid grid-cols-6 px-4">
          <button 
          //Quiero implementar una condicional, si la categoria es operaciones entonces el boton de operaciones tendra un color diferente
          className={`bg-primary-300 text-secondary-100 border-r border-gray-200 rounded-l-md py-2 shadow-md px-4 hover:bg-primary-200 ${categoria === "Operaciones" ? "bg-primary-500 text-secondary-100 border-r border-gray-200 rounded-l-md py-2 shadow-md px-4 hover:bg-primary-300" : ""}`}
          onClick={() => handleCategoriaClick("Operaciones")}
          >Operaciones</button>
          <button
          onClick={() => handleCategoriaClick("Administracion")}
          className={`bg-primary-300 text-secondary-100 border-r border-gray-200 py-2 shadow-md px-4 hover:bg-primary-200 ${categoria === "Administracion" ? "bg-primary-500 text-secondary-100 border-r border-gray-200 py-2 shadow-md px-4 hover:bg-primary-300" : ""}`}
          
          >Administracion</button>
          <button
          onClick={() => handleCategoriaClick("Programacion")}
          className={`bg-primary-300 text-secondary-100 border-r border-gray-200 py-2 shadow-md px-4 hover:bg-primary-200 ${categoria === "Programacion" ? "bg-primary-500 text-secondary-100 border-r border-gray-200 py-2 shadow-md px-4 hover:bg-primary-300" : ""}`}
           
           >Programacion</button>
          <button
           onClick={() => handleCategoriaClick("Base de datos")}
          className={`bg-primary-300 text-secondary-100 border-r border-gray-200 py-2 shadow-md px-4 hover:bg-primary-200 ${categoria === "Base de datos" ? "bg-primary-500 text-secondary-100 border-r border-gray-200 py-2 shadow-md px-4 hover:bg-primary-300" : ""}`}
          >Base de datos</button>
          <button 
          onClick={() => handleCategoriaClick("Seguridad")}
          className={`bg-primary-300 text-secondary-100 border-r border-gray-200 py-2 shadow-md px-4 hover:bg-primary-200 ${categoria === "Seguridad" ? "bg-primary-500 text-secondary-100 border-r border-gray-200 py-2 shadow-md px-4 hover:bg-primary-300" : ""}`}
          >Seguridad</button>
          <button
          onClick={() => handleCategoriaClick("Comunicaciones")}
          className={`bg-primary-300 text-secondary-100 rounded-r-md py-2 shadow-md px-4 hover:bg-primary-200 ${categoria === "Comunicaciones" ? "bg-primary-500 text-secondary-100 rounded-r-md py-2 shadow-md px-4 hover:bg-primary-300" : ""}`}
          >Comunicaciones</button>   
        </div>
</div>
  );
};

export default BarraDeBúsquedaIBM;
