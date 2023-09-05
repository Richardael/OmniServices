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
    <div>
<div 
className="bg-white flex flex-col max-w-sm mx-auto rounded-lg shadow-xl h-[370px] max-sm:h-[350px] relative">
  <div>
    {iconoServicios()}
  </div>
  <div className="bg-gray-900 mx-4 rounded-lg flex items-center gap-2 -mt-8 z-10 shadow-xl py-2 px-6 max-sm:px-2">
    <h3 className="text-white mx-auto font-semibold uppercase">{categoria}</h3>
  </div>
  <div className="px-6 py-4 flex flex-col gap-2">
    <h1 className="text-xl font-semibold text-gray-800 ">
    {nombre_servicio.split(" ").splice(0,5).join(" ")}
    </h1>
    <p className='text-secondary-300 max-sm:sm'>
    {descripcion_servicio.split(" ").splice(0,10).join(" ")}...
    </p>
    <button onClick={toggleModal} className="bg-primary-300 text-white py-2 px-16 max-sm:px-auto rounded-lg shadow-md hover:bg-primary-200 transition duration-300 ease-in-out absolute bottom-4 right-4 left-4 ">
      Ver más
    </button>
    </div>
    </div>
{showModal ? (
  <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
            <h3 className="text-3xl font-semibold">
              {nombre_servicio}
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={toggleModal}
            >
              <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">
            <p className="my-4 text-gray-600 text-lg leading-relaxed">
              {descripcion_servicio}
            </p>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
            <button
              className="text-secondary-200 bg-primary-300 rounded-md font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={toggleModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
) : null}
</div>
  )
}

export default TarjetaServicios