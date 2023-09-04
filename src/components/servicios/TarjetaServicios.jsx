import React, { useState } from 'react'
import { RiSettings2Fill, RiDatabase2Line,RiShieldCheckLine, RiAdminLine, RiWifiLine, RiTerminalBoxLine,RiCodeLine, RiUserSearchLine, RiMailSendLine } from 'react-icons/ri';
//Quiero crear una tarjeta de servicios que posea, un icono de react-icons, una categoria, un titulo, una descripcion.
//Quiero que ademas al presionar dicha tarjeta se genere un modal con la descripcion extendida de la tarjeta


const TarjetaServicios = ({id_servicio,categoria,nombre_servicio,descripcion_servicio}) => {
  const iconoServicios = () => {
    if (categoria === "Programacion") {
      return <RiTerminalBoxLine className='mx-auto mb-10 mt-5 h-20 w-20'/>
    } else if (categoria === "Redes") {
      return <RiWifiLine className='mx-auto mb-10 mt-5 h-20 w-20'/>
    } else if (categoria === "Hardware") {
      return <RiSettings2Fill  className='mx-auto mb-10 mt-5 h-20 w-20'/>
    } else if (categoria === "Software") {
      return <RiCodeLine  className='mx-auto mb-10 mt-5 h-20 w-20'/>
    } else if (categoria === "Seguridad") {
      return <RiShieldCheckLine  className='mx-auto mb-10 mt-5 h-20 w-20'/>
    } else if (categoria === "Base de datos") {
      return <RiDatabase2Line  className='mx-auto mb-10 mt-5 h-20 w-20'/>
    } else if (categoria === "Administracion") {
      return <RiAdminLine  className='mx-auto mb-10 mt-5 h-20 w-20'/>
    } else if (categoria === "Operaciones") {
      return <RiUserSearchLine  className='mx-auto mb-10 mt-5 h-20 w-20'/>
    } else if (categoria === "Comunicaciones") {
      return <RiMailSendLine  className='mx-auto mb-10 mt-5 h-20 w-20'/>
    }
    }
    //Modal
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
    };

  return (
    //Quiero que el icono sea por categoria de servicio
<div 
className="bg-white flex flex-col max-w-sm mx-auto rounded-lg shadow-xl">
  <div>
    {iconoServicios()}
  </div>
  <div className="bg-gray-900 mx-4 rounded-lg flex items-center gap-2 -mt-8 z-10 shadow-xl py-2 px-6">
    <h3 className="text-white text-lg font-semibold">{categoria}</h3>
  </div>
  <div className="px-6 py-4 flex flex-col gap-2">
    <h1 className="text-xl font-semibold text-gray-800">
      {nombre_servicio}
    </h1>
    <p className="text-gray-700">
        {descripcion_servicio}
    </p>
    <button onClick={toggleModal} className="bg-primary-300 text-white py-2 px-4 rounded-lg shadow-md hover:bg-primary-200 transition-colors">
        Ver más
    </button>
  </div>
</div>
  )
}

export default TarjetaServicios