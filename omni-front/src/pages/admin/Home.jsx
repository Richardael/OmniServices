import React from 'react';
import { Link } from 'react-router-dom';
// Icons
import { RiSearch2Line } from "react-icons/ri";
import Contador from '../../components/inicio/Contador';
import { useState, useEffect } from 'react';
import Notificaciones from '../../components/inicio/Notificaciones';

const Home = () => {
  const user = localStorage.getItem("nombre_us");

  return (
    <div>
      <div>
        {/* FOndo Arriba */}
        <div className='absolute -right-[20vh] h-[24vh] bg-primary-300 px-32 -top-10 rounded-b-full shadow-2xl'>
          
        </div>
        {/* Fondo Abajo */}
        <div className='absolute w-[70vh] left-[20vh] bg-primary-300 h-[15vh] bottom-0 rounded-t-full shadow-2xl'>

        </div>
      </div>
      <div className='flex'>
        <div className='mx-auto relative w-full mb-10'>
          <h1 className="text-xl font-extrabold text-left text-primary-900">
            Disfruta de tu visita en OmniServices, <span className='font-bold text-primary-300'> {user}</span>
          </h1>
        </div>
      </div>
      <div className='grid mb-8'>
        {/* Titulo para esta seccion, centrado, bonito y llamativo con una frase */}
        <h1 className='text-3xl font-extrabold text-center text-primary-900 mb-10'>
           Forma parte del crecimiento de <span className='text-primary-300'> Omniservices </span> </h1>
        <Contador />
      </div>
      <div className='grid mt-5'>
        <div>
        <Notificaciones />
        </div>
      </div>
    </div>
  );
};

export default Home;

