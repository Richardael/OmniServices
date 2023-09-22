import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Contador = () => {
    const [contador, setContador] = useState()

    const obtenerContador = async () => {
        const response = await axios.get('http://192.168.1.50:8000/inicio/contadorServicios')
        const contadorServicios = response.data
        setContador(contadorServicios)
    }

  return (
    <div>
        <div className='grid grid-cols-3 border-2 border-secondary-300'>
            <div className='flex justify-center border-secondary-300 border-r-2'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-3xl font-extrabold text-center text-primary-900 mb-10 mt-5'>
                        79
                    </h1>
                    <h1 className='text-3xl font-extrabold text-center text-primary-900 mb-5'>
                        Servicios
                    </h1>
                </div>
            </div>
            <div className='flex justify-center border-secondary-300 border-r-2'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-3xl font-extrabold text-center text-primary-900 mb-10 mt-5'>
                        0
                    </h1>
                    <h1 className='text-3xl font-extrabold text-center text-primary-900 mb-5'>
                        Talleres
                    </h1>
                </div>
            </div>
            <div className='flex justify-center border-secondary-300'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-3xl font-extrabold text-center text-primary-900 mb-10 mt-5'>
                        0
                    </h1>
                    <h1 className='text-3xl font-extrabold text-center text-primary-900 mb-5'>
                        Usuarios
                    </h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Contador