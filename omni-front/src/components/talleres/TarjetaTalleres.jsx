import React from 'react'
import { RiSettings2Fill, RiDatabase2Line,RiShieldCheckLine, RiAdminLine, RiWifiLine, RiTerminalBoxLine,RiCodeLine, RiUserSearchLine, RiMailSendLine } from 'react-icons/ri';
import { useState } from 'react';


const TarjetaTalleres = ({id_taller,tipo_plataforma,categoria,nombre_taller,tipo_taller,descripcion_taller,publico_taller,pre_conocimientos,temario_taller,obj_general,duracion_taller,modalidad_taller,cantidad_participantes}) => {
    const IconoTalleres = () => {
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
    {IconoTalleres()}
  </div>
  <div className="bg-gray-900 mx-4 rounded-lg flex items-center gap-2 -mt-8 z-10 shadow-xl py-2 px-6 max-sm:px-2">
    <h3 className="text-white mx-auto font-semibold uppercase">{categoria}</h3>
  </div>
  <div className="px-6 py-4 flex flex-col gap-2">
    <h1 className="text-xl font-semibold text-gray-800 ">
    {nombre_taller}
    </h1>
    <p className='text-secondary-300 max-sm:sm'>
    {descripcion_taller}
    </p>
    <button onClick={toggleModal} className="bg-primary-300 text-white py-2 px-16 max-sm:px-auto rounded-lg shadow-md hover:bg-primary-200 transition duration-300 ease-in-out absolute bottom-4 right-4 left-4 ">
      Ver más
    </button>
    </div>
    </div>
{showModal ? (
  <>
    <div className=" flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
            <h3 className="text-2xl font-semibold">
              {nombre_taller}
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
          <div className="relative px-6 py-2 flex-auto">
            <div className='grid grid-cols-4 shadow-md border-2 border-secondary-200 rounded-md p-2 mt-2 text-center mb-5'>
              <div>
                <h1 className='text-xl font-semibold text-primary-300'>Tipo de Plataforma</h1>
                <p className='text-secondary-300'>{tipo_plataforma}</p>
              </div>
              <div>
              <h1 className='text-xl font-semibold text-primary-300'>Categoria</h1>
                <p className='text-secondary-300'>{categoria}</p>
              </div>
              <div>
              <h1 className='text-xl font-semibold text-primary-300'>Tipo de Servicio</h1>
                <p className='text-secondary-300'>{tipo_taller}</p>
              </div>
              <div>
                <h1 className='text-xl font-semibold text-primary-300'>Industria Atendida</h1>
                <p className='text-secondary-300'>{publico_taller}</p>
              </div>
              </div>
              <div className='grid grid-cols-4 shadow-md border-2 border-secondary-200 rounded-md p-2 mt-2 text-center mb-5'>
              <div>
                <h1 className='text-xl font-semibold text-primary-300'>Prioridad</h1>
                <p className='text-secondary-300'>{obj_general}</p>
              </div>
              <div>
                <h1 className='text-xl font-semibold text-primary-300'>Disponibilidad</h1>
                <p className='text-secondary-300'>{modalidad_taller}</p>
              </div>
              <div>
                <h1 className='text-xl font-semibold text-primary-300'>Pre-Requisitos</h1>
                <p className='text-secondary-300'>{pre_conocimientos}</p>
              </div>
              <div>
                <h1 className='text-xl font-semibold text-primary-300'>Tiempo Estimado</h1>
                <p className='text-secondary-300'>{duracion_taller} <span className=' font-semibold'>Horas</span></p>
              </div>
            </div>
            <div className='grid grid-cols-2 shadow-md border-2 border-secondary-200 rounded-md p-2 mt-2 mb-5 text-center'>
              <div>
                <h1 className='text-xl font-semibold text-primary-300'>Costos</h1>
                <p className='text-secondary-300'>{cantidad_participantes}</p>
              </div>
            </div>
            <div className='w-full grid gap-2 grid-cols-2 mb-2'>
              <div>
              <h1 className='text-xl font-semibold text-primary-300 mt-2 text-center'>Descripcion del Servicio</h1>
            <p className="mt-2 text-secondary-300 text-lg leading-relaxed border rounded-md p-2 shadow-md text-justify">
              {descripcion_taller}
            </p>
              </div>
              <div>
              <h1 className='text-xl font-semibold text-primary-300 mt-2 text-center'>Descripcion Tecnica del Servicio</h1>
            <p className="mt-2 text-secondary-300 text-lg leading-relaxed border rounded-md p-2 shadow-md text-justify" >
              {temario_taller}
            </p>
              </div>
        

            </div>
            
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end px-6 py-2 border-t border-solid border-gray-300 rounded-b">
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

export default TarjetaTalleres