import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import axios from 'axios'

const Contador = () => {
    const [contadorServiciosIBM, setContadorServiciosIBM] = useState(0)
    const [contadorServiciosOpen, setContadorServiciosOpen] = useState(0)
    const [contadorTalleresIBM, setContadorTalleresIBM] = useState(0)
    const [contadorTalleresOpen, setContadorTalleresOpen] = useState(0)
    const [contadorUsuariosRegistrados, setContadorUsuariosRegistrados] = useState(0)

    const obtenerContador = async () => {
        const response = await axios.get('https://omniservices.onrender.com/contador/contador')
        const obtenido = response.data
        console.log (obtenido)
        const contadorServicios = obtenido.servicios
        const contadorTalleres = obtenido.talleres
        const contadorUsuarios = obtenido.usuarios
        setContadorServiciosIBM(contadorServicios.cantidadIBM)
        setContadorServiciosOpen(contadorServicios.cantidadOpen)
        setContadorTalleresIBM(contadorTalleres.cantidadIBM)
        setContadorTalleresOpen(contadorTalleres.cantidadOpen)
        setContadorUsuariosRegistrados(contadorUsuarios.cantidadUsuarios)
    }

    useEffect(() => {
        obtenerContador()
        //Quiero que se actualice cada 5s para que se actualice el contador
        const interval = setInterval(() => {
            obtenerContador()
        }, 5000)
        return () => clearInterval(interval)
    }
    , [])

    const contadorServiciosIBMProps = useSpring({
        from: { value: 0 },
        to: { value: contadorServiciosIBM },
        config: { duration: 2000 }, // Duración de la animación en milisegundos
      })
      
      const contadorServiciosOpenProps = useSpring({
        from: { value: 0 },
        to: { value: contadorServiciosOpen },
        config: { duration: 2000 }, // Duración de la animación en milisegundos
      })

      const contadorTalleresIBMProps = useSpring({
        from: { value: 0 },
        to: { value: contadorTalleresIBM },
        config: { duration: 2000 }, // Duración de la animación en milisegundos
      })

        const contadorTalleresOpenProps = useSpring({
        from: { value: 0 },
        to: { value: contadorTalleresOpen },
        config: { duration: 2000 }, // Duración de la animación en milisegundos
        })

        const contadorUsuariosRegistradosProps = useSpring({
        from: { value: 0 },
        to: { value: contadorUsuariosRegistrados },
        config: { duration: 2000 }, // Duración de la animación en milisegundos
        })


  return (
    //Diseña una sección que muestre el número de servicios IBM, Servicios Open, talleres IBM, talleres Open y usuarios registrados en la plataforma.
    //Quiero que sea responsivo
    //Usa TailwindCSS
    //Quiero que el diseño sea moderno

    <div className='grid grid-cols-5 gap-4'>
      <div className='bg-white shadow-md rounded-md p-4'>
<animated.p className='text-4xl font-extrabold text-center text-primary-300'>
  {contadorServiciosIBMProps.value.interpolate((value) => Math.floor(value))}
</animated.p>
        <p className='text-lg font-extrabold text-center uppercase'>
          Servicios IBM
        </p>
      </div>
      <div className='bg-white shadow-md rounded-md p-4'>
        <animated.p className='text-4xl font-extrabold text-center text-primary-300'>
            {contadorServiciosOpenProps.value.interpolate((value) => Math.floor(value))}
        </animated.p>
        <p className='text-lg font-extrabold text-center uppercase'>
          Servicios Open
        </p>
      </div>
      <div className='bg-white shadow-md rounded-md p-4'>
        <animated.p className='text-4xl font-extrabold text-center text-primary-300'>
            {contadorTalleresIBMProps.value.interpolate((value) => Math.floor(value))}
        </animated.p>
        <p className='text-lg font-extrabold text-center uppercase'>
          Talleres IBM
        </p>
      </div>
      <div className='bg-white shadow-md rounded-md p-4'>
        <animated.p className='text-4xl font-extrabold text-center text-primary-300'>
            {contadorTalleresOpenProps.value.interpolate((value) => Math.floor(value))}
        </animated.p>
        <p className='text-lg font-extrabold text-center uppercase'>
          Talleres Open
        </p>
      </div>
      <div className='bg-white shadow-md rounded-md p-4'>
        <animated.p className='text-4xl font-extrabold text-center text-primary-300'>
            {contadorUsuariosRegistradosProps.value.interpolate((value) => Math.floor(value))}
        </animated.p>
        <p className='text-lg font-extrabold text-center uppercase'>
          Usuarios
        </p>
      </div>
    </div>

    
  )
}

export default Contador