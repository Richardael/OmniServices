import React from 'react';
import { Link } from 'react-router-dom';
// Icons
import { RiSearch2Line } from "react-icons/ri";
import Contador from '../../components/inicio/Contador';

const Home = () => {

  return (
    <div>
      <div className='flex mb-6'>
        <div className='mx-auto relative w-full'>
          <h1 className="text-3xl font-extrabold text-center text-primary-900">
            Bienvenido a <span className="text-primary-300"> OmniServices</span>
          </h1>
        </div>
      </div>
      <div className='grid '>
        <h1 className='text-3xl font-extrabold text-center text-primary-900 mb-10'>
          Contadores
        </h1>
        <Contador />
      </div>
      <div className='grid grid-cols-2 mt-10'>
        <div>
        <h1 className='text-3xl font-extrabold text-center text-primary-900 mb-10'>
          Graficas
        </h1>
        <span>Aca van graficas</span>
        </div>
        <div>
        <h1 className='text-3xl font-extrabold text-center text-primary-900 mb-10'>
          Notificaciones
        </h1>
        <span>Aca van Notificaciones</span>
        </div>
      </div>
    </div>
  );
};

export default Home;

