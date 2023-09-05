import React from "react";
//Quiero una barra de busqueda que me permita buscar servicios por nombre
//Quiero que la barra de busqueda me permita buscar servicios por categoria
const BarraDeBusquedaOpen = () => {
    const user = localStorage.getItem('user');
  return (
    <div className="mb-10 bg-white p-4 shadow-md">
    <div className="px-2 py-2 relative sm:flex">
    <div className="2/5">
           <h1 className="font-semibold text-2xl py-2 max-sm:p-0 pr-24 max-sm:mb-5 max-sm:text-center pl-4">Bienvenido <span className="text-primary-300">RichyPage</span></h1> 
        </div>
      <form className="w-3/5 max-sm:ml-3 max-sm:w-4/5 max-md:mb-4" action="">
        <input
        className="w-full px-4 py-3 rounded-lg ring-1 focus:outline-none focus:ring-1 ring-gray-300 focus:ring-primary-300"
        type="text" placeholder="Buscar servicios" />
        <button className="absolute bg-primary-300 ring-1 ring-primary-300 text-secondary-100 rounded-r-md py-3 px-4 right-5 hover:bg-primary-200">Buscar</button>
      </form>
      {/* Quiero que mi barra de busqueda me permita filtrar por categoria */}
    </div>
          <div className="grid grid-cols-6 px-4 max-sm:p-0 max-sm:grid-cols-2 max-sm:gap-2">
          <button className="bg-primary-300 text-secondary-100 border-r border-gray-200 rounded-l-md py-2 shadow-md px-4 max-sm:p-2 max-sm:rounded-md hover:bg-primary-200">Programacion</button>
          <button className="bg-primary-300 text-secondary-100 py-2 border-r border-gray-200 shadow-md px-4 max-sm:p-2 max-sm:rounded-md hover:bg-primary-200">Base de datos</button>
          <button className="bg-primary-300 text-secondary-100 py-2 border-r border-gray-200 shadow-md px-4 max-sm:p-2 max-sm:rounded-md hover:bg-primary-200">Seguridad</button>
          <button className="bg-primary-300 text-secondary-100 py-2 border-r border-gray-200 shadow-md px-4 max-sm:p-2 max-sm:rounded-md hover:bg-primary-200">Redes</button>
          <button className="bg-primary-300 text-secondary-100 py-2 border-r border-gray-200 shadow-md px-4 max-sm:p-2 max-sm:rounded-md hover:bg-primary-200">Hardware</button>
          <button className="bg-primary-300 text-secondary-100 rounded-r-md py-2 shadow-md px-4 max-sm:p-2 max-sm:rounded-md hover:bg-primary-200">Software</button>   
        </div>
</div>
  );
};

export default BarraDeBusquedaOpen;
