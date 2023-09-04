import React, { useState } from 'react'
import { RiSettings2Fill } from 'react-icons/ri';
//Quiero crear una tarjeta de servicios que posea, un icono de react-icons, una categoria, un titulo, una descripcion.
//Quiero que ademas al presionar dicha tarjeta se genere un modal con la descripcion extendida de la tarjeta


const TarjetaServicios = () => {
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
    };
  return (
    //Quiero que el icono sea por categoria de servicio
<div 
className="bg-white flex flex-col max-w-sm mx-auto rounded-lg shadow-xl">
  <div>
    <RiSettings2Fill className='mx-auto mb-10 mt-5 h-20 w-20'/>
  </div>
  <div className="bg-gray-900 mx-4 rounded-lg flex items-center gap-2 -mt-8 z-10 shadow-xl py-2 px-6">
    <h3 className="text-white text-lg font-semibold">Hardware</h3>
  </div>
  <div className="px-6 py-4 flex flex-col gap-2">
    <h1 className="text-xl font-semibold text-gray-800">
        Mantenimiento de computadoras
    </h1>
    <p className="text-gray-700">
        Mantenimiento preventivo y correctivo de computadoras de escritorio y portátiles.
    </p>
    <button onClick={toggleModal} className="bg-primary-300 text-white py-2 px-4 rounded-lg shadow-md hover:bg-primary-400 transition-colors">
        Ver más
    </button>
  </div>
</div>
  )
}

export default TarjetaServicios